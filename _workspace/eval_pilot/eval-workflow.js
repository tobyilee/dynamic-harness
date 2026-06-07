// P3 — skill-testing-guide.md §9 "워크플로우 모드 eval 하네스"의 실행 가능 구현.
// 문서 스케치를 실제 돌아가는 Workflow 스크립트로 옮긴 것. 스킬 With/Baseline을 프롬프트별로
// 동시 실행(parallel) → assertion 채점(schema) → win-rate/lift(JS 결정적 집계).
// 두 suite를 실행해 non-discriminating(iter-1) vs discriminating(iter-2) eval을 대조한다.
export const meta = {
  name: 'eval-harness',
  description: '스킬 With/Baseline 비교 eval — 동시 실행 후 assertion 채점, suite별 win-rate/lift 산출',
  phases: [{ title: 'Run' }, { title: 'Grade' }],
}

const BASE = '/Users/tobylee/workspace/ai/dynamic-harness/_workspace/eval_pilot'

// 보안: iter/name은 파일 경로(${BASE}/${iter}/eval-${name}/)에 들어가므로 strict allowlist로 path
// traversal을 차단한다(통과하면 '/'·'..' 등이 불가능해 경로가 BASE 하위로 봉인됨). prompt/assertions는
// 타입·길이를 cap한다. eval 케이스는 author 제공 설정(테스트 픽스처와 동급)이지만 외부 입력이 흘러들
// 수 있어 방어적으로 검증한다. 단, 검증된 prompt를 실행하는 에이전트의 파일 쓰기를 스크립트가
// tool-layer에서 강제할 수는 없으므로(워크플로우 런타임에 FS/Node API 없음), prompt injection의
// 잔여 위험은 신뢰 경계로 관리한다.
const NAME_RE = /^[a-zA-Z0-9_-]{1,64}$/
const validateName = (s, kind) => {
  if (typeof s !== 'string' || !NAME_RE.test(s)) throw new Error(`Invalid ${kind} (allowlist ${NAME_RE}): ${JSON.stringify(s)}`)
}
const validateEval = (e) => {
  validateName(e && e.name, 'eval name')
  if (typeof e.prompt !== 'string' || e.prompt.length === 0 || e.prompt.length > 2000)
    throw new Error(`Invalid prompt for "${e.name}" (must be 1-2000 chars)`)
  if (!Array.isArray(e.assertions) || e.assertions.length === 0 || e.assertions.some((a) => typeof a !== 'string' || a.length > 500))
    throw new Error(`Invalid assertions for "${e.name}" (non-empty string[], each <=500 chars)`)
}

// config-as-data (자기완결형 — scriptPath + 깊게 중첩된 args 주입이 불안정해 in-script로 둔다)
const SUITES = [
  {
    iter: 'iteration-1',
    note: 'non-discriminating: Conventional Commits는 베이스 모델 기본 지식 → lift≈0 예상',
    skillPath: `${BASE}/skill-under-test/SKILL.md`,
    evals: [
      {
        name: 'jwt-auth',
        prompt: 'JWT 토큰 기반 사용자 인증을 추가한 변경에 대한 git 커밋 메시지를 한 줄로 작성하라.',
        assertions: [
          '출력이 Conventional Commits 형식이다: `type:` 또는 `type(scope):` 로 시작한다',
          'type이 feat/fix/docs/refactor/test/chore 중 하나다',
          'subject가 마침표(.)로 끝나지 않는다',
        ],
      },
      {
        name: 'login-bug',
        prompt: '로그인 페이지의 비밀번호 표시 토글 버튼이 동작하지 않는 버그를 수정한 변경의 git 커밋 메시지를 한 줄로 작성하라.',
        assertions: ['출력이 Conventional Commits 형식이다 (`type:` 또는 `type(scope):`)', 'type이 fix다', '전체가 한 줄이다'],
      },
    ],
  },
  {
    iter: 'iteration-2',
    note: 'discriminating: 커스텀 [ABC-n] 티켓 프리픽스는 베이스가 모름 → baseline 실패 예상 → lift>0',
    skillPath: `${BASE}/skill-under-test-v2/SKILL.md`,
    evals: [
      {
        name: 'jwt-auth',
        prompt: 'JWT 토큰 기반 사용자 인증을 추가한 변경에 대한 git 커밋 메시지를 한 줄로 작성하라.',
        assertions: [
          '출력이 `[ABC-숫자]` 형태의 티켓 프리픽스로 시작한다',
          '티켓 프리픽스 뒤에 `type:` 또는 `type(scope):`가 온다',
          'subject가 마침표(.)로 끝나지 않는다',
        ],
      },
      {
        name: 'login-bug',
        prompt: '로그인 페이지의 비밀번호 표시 토글 버튼이 동작하지 않는 버그를 수정한 변경의 git 커밋 메시지를 한 줄로 작성하라.',
        assertions: ['출력이 `[ABC-숫자]` 티켓 프리픽스로 시작한다', 'type이 fix다', '전체가 한 줄이다'],
      },
    ],
  },
]

// grading.json 스키마(skill-writing-guide §7)와 동일 필드 — text/passed/evidence
const GRADING_SCHEMA = {
  type: 'object',
  properties: {
    expectations: {
      type: 'array',
      items: {
        type: 'object',
        properties: { text: { type: 'string' }, passed: { type: 'boolean' }, evidence: { type: 'string' } },
        required: ['text', 'passed', 'evidence'],
      },
    },
  },
  required: ['expectations'],
}

// passRate는 모델이 아니라 JS가 결정적으로 계산 (§9의 "결정적 채점")
const rate = (g) => (g && g.expectations.length ? g.expectations.filter((x) => x.passed).length / g.expectations.length : 0)
const gradePrompt = (e, file) =>
  `${file} 파일을 Read로 읽고, 아래 각 assertion의 통과 여부를 판정하라. ` +
  `각 항목에 text(assertion 원문)/passed(boolean)/evidence(판정 근거)를 채워라.\n\nAssertions:\n` +
  e.assertions.map((a, i) => `${i + 1}. ${a}`).join('\n')

// 검증 + (suite, eval) 평탄화
const TASKS = []
for (const s of SUITES) {
  validateName(s.iter, 'iter')
  for (const e of s.evals) {
    validateEval(e)
    TASKS.push({ s, e })
  }
}
log(`eval-harness: ${SUITES.length} suites, ${TASKS.length} evals`)

const results = (
  await pipeline(
    TASKS,
    // Run — with-skill / baseline 동시 실행 (배리어). 같은 프롬프트, 스킬 유/무만 차이.
    ({ s, e }) => {
      const dir = `${BASE}/${s.iter}/eval-${e.name}`
      return parallel([
        () =>
          agent(
            `스킬 지침 파일을 Read로 읽고(${s.skillPath}) 그 규칙을 적용해 수행하라:\n${e.prompt}\n` +
              `결과 텍스트만 ${dir}/with.txt 에 Write로 저장(설명 없이 결과만).`,
            { label: `with:${s.iter}:${e.name}`, phase: 'Run' }
          ),
        () =>
          agent(`다음을 수행하라:\n${e.prompt}\n결과 텍스트만 ${dir}/baseline.txt 에 Write로 저장(설명 없이 결과만).`, {
            label: `base:${s.iter}:${e.name}`,
            phase: 'Run',
          }),
      ])
    },
    // Grade — with/baseline 산출물을 각각 assertion 채점
    (_run, { s, e }) => {
      const dir = `${BASE}/${s.iter}/eval-${e.name}`
      return parallel([
        () => agent(gradePrompt(e, `${dir}/with.txt`), { label: `grade-with:${s.iter}:${e.name}`, phase: 'Grade', schema: GRADING_SCHEMA }),
        () => agent(gradePrompt(e, `${dir}/baseline.txt`), { label: `grade-base:${s.iter}:${e.name}`, phase: 'Grade', schema: GRADING_SCHEMA }),
      ]).then(([w, b]) => ({ iter: s.iter, name: e.name, withRate: rate(w), baseRate: rate(b) }))
    }
  )
).filter(Boolean)

// suite별 집계
const bySuite = {}
for (const r of results) (bySuite[r.iter] = bySuite[r.iter] || []).push(r)
const summary = Object.keys(bySuite).map((iter) => {
  const rs = bySuite[iter]
  const withAvg = rs.reduce((a, r) => a + r.withRate, 0) / rs.length
  const baseAvg = rs.reduce((a, r) => a + r.baseRate, 0) / rs.length
  return { iter, n: rs.length, withAvg, baseAvg, lift: withAvg - baseAvg }
})

return { summary, perEval: results }
