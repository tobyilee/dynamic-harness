# Workflow 모드 — 결정적 오케스트레이션 (Template D)

Claude Code의 **Workflow 도구**(dynamic workflow)를 Harness의 4번째 실행 모드로 사용하는 가이드. 팀·서브·하이브리드가 모두 **모델 주도**(Claude가 매 턴 다음 행동을 결정)인 데 반해, 워크플로우는 **JS 스크립트가 제어 흐름(루프·분기·중간 결과)을 보유**한다. Claude의 컨텍스트에는 최종 답만 남는다.

> ⚠️ **Research preview.** Workflow 도구는 Claude Code v2.1.154+ 의 연구 프리뷰다. API(프리미티브 이름·예산 문법·재개 범위)가 GA 전에 바뀔 수 있다. 이 모드로 생성하는 산출물은 **버전 게이팅**하고 provisional로 다룬다. 사용 불가 환경이면 팀/서브/하이브리드로 폴백한다.

## 목차

1. [언제 워크플로우 모드를 쓰는가](#1-언제-워크플로우-모드를-쓰는가)
2. [핵심 프리미티브](#2-핵심-프리미티브)
3. [Harness 6패턴 → 프리미티브 매핑](#3-harness-6패턴--프리미티브-매핑)
4. [Template D: 워크플로우 모드 오케스트레이터](#4-template-d-워크플로우-모드-오케스트레이터)
5. [품질 패턴 — 결정적 인코딩](#5-품질-패턴--결정적-인코딩)
6. [비용 — 모델 티어링 + 예산](#6-비용--모델-티어링--예산)
7. [_workspace/ 감사 추적 유지](#7-_workspace-감사-추적-유지)
8. [한계와 주의](#8-한계와-주의)

---

## 1. 언제 워크플로우 모드를 쓰는가

모드 선택의 축은 **규모 · 반복성 · 재개성**이다. 다른 모드와의 경계:

| 신호 | 권장 모드 | 이유 |
|------|----------|------|
| 통신하는 소수의 장기 피어 (실시간 토론·상호 참조) | 에이전트 팀 | 발견 공유·상충 토론이 품질을 좌우 |
| 턴당 소수의 위임 작업, 결과만 반환 | 서브 에이전트 | 가볍고 빠름, 팀 오버헤드 불필요 |
| **수십~수백 에이전트로 팬아웃** | **워크플로우** | 16 동시 / 1,000 총 캡 안에서 결정적 스케일 |
| **오케스트레이션 자체가 반복 실행됨** (매번 같은 절차) | **워크플로우** | 절차를 코드로 고정 → 재현성 |
| **결정적 시퀀스·품질 게이트가 필수** | **워크플로우** | 정합성을 모델 토론이 아닌 코드가 보장 |
| **같은 세션 내 중단 후 재개가 필요** | **워크플로우** | `runId` 기반 재개(아래 8장 주의) |

**왜 컨텍스트가 가벼워지는가:** 모델 주도 모드에서는 모든 중간 산출물·조율 메시지가 Claude 컨텍스트(또는 `_workspace/` + 컨텍스트)에 쌓인다. 워크플로우에서는 루프·분기·중간 결과가 **스크립트 변수**에 살고, 각 `agent()`는 독립 컨텍스트 창을 가진 뒤 **결론만** 반환한다. 그래서 대규모 팬아웃에서도 메인 컨텍스트가 오염되지 않는다.

> **추가이지 교체가 아니다.** agent-teams의 "최우선 기본값" 지위는 소규모 협업에서 유지한다(`SKILL.md` 2-1). 워크플로우는 위 신호가 켜질 때만 선택하는 **피어 모드**다.

---

## 2. 핵심 프리미티브

워크플로우 스크립트는 평범한 JavaScript이며, 다음 훅을 쓴다:

| 프리미티브 | 의미 | 반환 |
|-----------|------|------|
| `agent(prompt, opts?)` | 서브에이전트 1개 실행 | `schema` 없으면 최종 텍스트(string), 있으면 검증된 객체. 스킵/사망 시 `null` |
| `pipeline(items, s1, s2, …)` | 각 아이템을 모든 스테이지에 **독립** 통과 | 결과 배열. **스테이지 간 배리어 없음** |
| `parallel(thunks)` | 동시 실행 후 전부 대기 | 결과 배열. **배리어**. 실패 thunk는 `null` → `.filter(Boolean)` |
| `phase(title)` | 진행 단계 그룹핑 | — |
| `log(message)` | 진행 메시지 출력 | — |
| `workflow(name\|{scriptPath}, args?)` | 다른 워크플로우를 인라인 호출 | 자식의 반환값. **중첩 1단계만** |

**`agent()` 옵션:** `{ label, phase, schema(JSON Schema), model, isolation:'worktree', agentType }`. `schema`를 주면 검증은 도구 레이어에서 일어나고 불일치 시 모델이 자동 재시도한다 → 파싱 불필요.

**전역값:** `args`(Workflow 호출 시 넘긴 입력), `budget`(`{ total, spent(), remaining() }` — 토큰 예산).

**런타임 캡·제약 (반드시 인지):**
- 동시 실행 `min(16, CPU코어-2)` — 초과분은 큐잉되어 슬롯이 나면 실행
- 워크플로우 수명 전체 **1,000 에이전트** 상한(런어웨이 방지), 단일 `parallel()`/`pipeline()` 호출은 **최대 4,096 아이템**
- **스크립트는 파일시스템·셸 접근이 없다** — read/write/bash는 각 `agent()`가 한다(7장 참조)
- `Date.now()` / `Math.random()` / 인자 없는 `new Date()` 금지(재개를 깨뜨림) — 타임스탬프는 `args`로 주입
- TypeScript 아님(타입 표기·제네릭 파싱 실패). 표준 JS 빌트인만

**meta 블록(필수, 순수 리터럴):** 스크립트는 반드시 다음으로 시작한다. 변수·함수 호출·스프레드 금지.

```js
export const meta = {
  name: 'launch-harness',                         // kebab-case
  description: 'Fan-out 수집 후 통합 런치 플랜 생성', // 권한 다이얼로그에 표시
  phases: [                                        // phase() 호출과 title 동일하게
    { title: 'Collect' },
    { title: 'Synthesize' },
  ],
}
// 여기부터 스크립트 본문 (await 직접 사용 가능)
```

---

## 3. Harness 6패턴 → 프리미티브 매핑

Harness의 6개 아키텍처 패턴은 모두 **결정적 토폴로지 위의 모델 노드**로 표현된다.

| 패턴 | 프리미티브 | 핵심 |
|------|-----------|------|
| **파이프라인** | `pipeline(items, s1, s2, …)` | 배리어 없음 — 아이템 A가 3단계일 때 B는 1단계 가능. 벽시계 = 단일 체인 최댓값 |
| **팬아웃/팬인** | `parallel(thunks)` | 배리어 — 전 결과를 모아 팬인. dedup·0건 조기종료·교차참조에 정당 |
| **전문가 풀** | 조건 분기 후 특정 `agent()` 호출 | 라우터 로직은 평범한 JS `if`/`switch` |
| **생성-검증** | `pipeline(items, generate, verify)` | verify가 throw하면 해당 아이템 `null`로 드롭 |
| **감독자** | `while`/`budget` 루프 + 동적 `agent()` 분배 | 런타임 결과를 보고 다음 작업 결정 |
| **계층적 위임** | `workflow(child, args)` (1단계) | 중첩은 1단계만 — 더 깊으면 평탄화 |

> **기본은 `pipeline()`이다.** 배리어(`parallel`)는 "정말로 모든 이전 결과가 동시에 필요할 때"(전체 dedup, 0건 조기종료, '다른 발견과 비교')만 정당하다. "flatten/map/filter가 필요해서"는 배리어 사유가 아니다 — 스테이지 안에서 처리하라.

---

## 4. Template D: 워크플로우 모드 오케스트레이터

워크플로우 모드의 오케스트레이터는 **스킬 + 번들 스크립트** 쌍으로 구성한다. 스킬(`SKILL.md`)이 입력 수집·호출·결과 보고를 담고, 번들된 `scripts/{domain}-workflow.js`가 결정적 제어 흐름을 담는다. 이는 Harness의 "반복·결정적 작업은 `scripts/`에 번들"(`SKILL.md` 4-3) 원칙과 정합한다.

### 4-1. 오케스트레이터 SKILL.md

````markdown
---
name: {domain}-orchestrator
description: "{도메인} 워크플로우를 실행하는 오케스트레이터. {초기 실행 키워드}. 후속 작업: 재실행, 부분 재실행, 업데이트, 보완, 이전 결과 개선 요청 시에도 반드시 이 스킬을 사용."
---

# {Domain} Orchestrator (워크플로우 모드)

## 실행 모드: 워크플로우 (Claude Code Workflow 도구)

## 워크플로우

### Phase 0: 사전 점검
1. Workflow 도구 가용 여부 확인 — 불가 시 팀/서브 모드로 폴백(orchestrator-template.md 템플릿 A/B)
2. `_workspace/` 존재 여부 확인 → 신규/부분 재실행/새 실행 분기 (templates A와 동일)

### Phase 1: 입력 수집
1. 사용자 입력에서 {파라미터}를 파악해 `args` 객체로 구성
   - 타임스탬프가 필요하면 **여기서** 값을 만들어 `args`에 넣는다(스크립트 내 `Date.now()` 금지)
2. **`args` 유효성 검증** — 누락된 필수 필드, 과거 날짜(목표일이 오늘 이전), 형식 오류를 여기서 거부하거나 사용자에게 되묻는다. 스크립트는 결정적 흐름만 담당하고 검증 책임을 지지 않으므로, 잘못된 입력이 그대로 에이전트에 흘러가면 **조용히 우회되거나 산출물이 틀어진다** (실측 사례: 과거 목표일을 넘기자 strategist가 "목표일 미제공"으로 판단해 상대 타임라인으로 우회).
3. `_workspace/00_input/`에 입력 저장

### Phase 2: 워크플로우 호출
`scripts/{domain}-workflow.js`를 Workflow 도구로 실행한다:
```
Workflow({ scriptPath: "...skills/{domain}-orchestrator/scripts/{domain}-workflow.js", args: {수집한 파라미터} })
```

### Phase 3: 결과 수집 및 보고
1. 워크플로우 반환값(최종 종합 결과) 수신
2. 각 에이전트가 기록한 `_workspace/*` 산출물을 Read로 보강
3. 최종 산출물을 `{output-path}`에 출력, 사용자에게 요약 보고

### 재개
중단되면 같은 세션에서 `Workflow({scriptPath, resumeFromRunId})`로 재개 — 변경 전 prefix는 캐시 결과 즉시 반환.

## 테스트 시나리오
- 정상: 입력 → 워크플로우 실행 → `{output}` 생성
- 폴백: Workflow 도구 불가 → 팀 모드로 동일 산출물 생성
````

### 4-2. 번들 스크립트 (팬아웃/팬인 예시 — 실제 런치 하네스 기반)

```js
export const meta = {
  name: 'launch-harness',
  description: 'Fan-out 자료 수집 후 통합 런치 플랜 생성',
  phases: [{ title: 'Collect' }, { title: 'Synthesize' }],
}

const SUMMARY_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    gist:  { type: 'string', description: '3-5문장 핵심 요약' },
    file:  { type: 'string', description: '기록한 _workspace 경로' },
  },
  required: ['title', 'gist', 'file'],
}

// args 예: { repo: "revfactory/harness", goalDate: "2026-04-07" }
phase('Collect')
const COLLECTORS = [
  { name: 'auditor', prompt: `${args.repo} 저장소를 감사하고 결과를 _workspace/01_auditor_repo_audit.md 에 기록하라. 반환은 핵심 요약만.` },
  { name: 'content', prompt: `런치 콘텐츠(멀티 플랫폼)를 작성해 _workspace/02_content_launch_contents.md 에 기록하라. 반환은 핵심 요약만.` },
  { name: 'scout',   prompt: `아웃리치 타겟 맵을 작성해 _workspace/03_scout_outreach_map.md 에 기록하라. 반환은 핵심 요약만.` },
]
// parallel = 배리어: 세 수집을 모두 모아 팬인
const collected = (await parallel(
  COLLECTORS.map(c => () => agent(c.prompt, { label: c.name, phase: 'Collect', schema: SUMMARY_SCHEMA }))
)).filter(Boolean)

phase('Synthesize')
const plan = await agent(
  `다음 산출물을 종합해 통합 런치 플랜을 _workspace/04_strategist_launch_plan.md 에 작성하라(목표일 ${args.goalDate}).\n` +
  collected.map(s => `- ${s.title} (${s.file}): ${s.gist}`).join('\n'),
  { label: 'strategist', phase: 'Synthesize' }
)
return { plan, collectedCount: collected.length }
```

> 이 예시는 `_workspace/`에 남은 실제 런(auditor→content→scout→strategist 팬아웃/팬인)을 워크플로우로 옮긴 형태다. 세 수집자가 `parallel`로 동시 실행되고 strategist가 팬인한다.

---

## 5. 품질 패턴 — 결정적 인코딩

Harness의 **생성-검증**·**팬아웃/팬인**을 모델 주도 SendMessage 토론이 아니라 코드로 고정하면 반복 가능·재현 가능해진다.

**어드버서리얼 검증** (생성-검증의 결정적 형태):
```js
const votes = await parallel(Array.from({ length: 3 }, () => () =>
  agent(`다음 주장을 반증하라(불확실하면 refuted=true 기본): ${claim}`, { schema: VERDICT_SCHEMA })))
const survives = votes.filter(Boolean).filter(v => !v.refuted).length >= 2  // 2/3 통과만 채택
```

**Loop-until-dry** (크기를 모르는 발견 — 감독자 패턴):
```js
let dry = 0
const seen = new Set()
while (dry < 2) {                                  // 2회 연속 새 발견 없을 때까지
  const fresh = (await findItems()).filter(x => !seen.has(key(x)))
  if (!fresh.length) { dry++; continue }
  dry = 0; fresh.forEach(x => seen.add(key(x)))
  /* ...검증·채택... */
}
```

> ⚠️ "single pass보다 신뢰성 높음"은 **정량 미검증 벤더 주장**(research preview)이다. 원리로 채택하되 수치로 광고하지 말 것. 이 패턴이 실제로 품질을 올리는지는 Harness의 With/Without 비교(`SKILL.md` 6-3)로 도메인별 측정.

---

## 6. 비용 — 모델 티어링 + 예산

워크플로우는 **스테이지별 모델 라우팅**과 **토큰 예산**을 네이티브로 지원한다 — Harness가 갖지 못한 비용 레버다.

**스테이지별 티어링:** `agent(prompt, { model: 'haiku' })` — 단순·기계적 단계(형식 변환, 목록 수집, 정형 추출)는 하위 티어로. 기본은 세션 모델(보통 opus)이며, **불확실하면 model을 생략**(상속)한다.

**적응형 팬아웃** (정적 팀 크기 대신 복잡도 기반):

| 복잡도 | 에이전트 수 |
|--------|-----------|
| 단순 사실 확인 | ~1 |
| 직접 비교 | 2-4 |
| 복잡 리서치 | 10+ |

> 문서화된 실패 모드: 단순 쿼리에 50개 서브에이전트 스폰. 복잡도와 무관한 고정 팀 크기는 과투자다.

**예산 인지 스케일:** 사용자가 토큰 목표를 주면
```js
const FLEET = budget.total ? Math.floor(budget.total / 100_000) : 5
while (budget.total && budget.remaining() > 50_000) { /* ... */ }
```

> ⚠️ **opus 해제는 비용 근거로만.** "Opus리드+Sonnet서브 90.2% 향상" 주장은 어드버서리얼 검증에서 **폐기(0-3)**됐다. 티어 변경의 품질 영향은 가정하지 말고 `SKILL.md` 6-3 A/B로 도메인별 검증한 뒤 적용한다.

---

## 7. _workspace/ 감사 추적 유지

워크플로우 **스크립트 자체는 파일시스템 접근이 없지만**, 그 안에서 호출되는 **각 `agent()`는 read/write/bash가 가능**하다. 따라서 Harness의 감사추적 요구(`orchestrator-template.md`의 `_workspace/` 보존)는 그대로 충족된다:

- 제어 흐름·중간 결과 → **스크립트 변수**(Claude 컨텍스트 절약)
- 영속 산출물 → 에이전트 프롬프트에 `_workspace/{phase}_{agent}_{artifact}.md`에 쓰라고 지시
- 파일명 컨벤션은 기존과 동일 (`01_auditor_repo_audit.md` 등)

즉 "스크립트는 흐름을, 에이전트는 I/O를" 분담한다.

---

## 8. 한계와 주의

| 항목 | 내용 |
|------|------|
| **Research preview** | v2.1.154+ 필요, API 변경 가능 → 생성 템플릿 버전 게이팅 + 폴백 경로 필수 |
| **재개는 same-session** | `runId` 재개는 **같은 Claude Code 세션 내**에서만. 세션 종료 시 워크플로우는 처음부터. cross-session 영속이 필요하면 `_workspace/` 파일 스냅샷 병행 |
| **벤치마크 부재** | Harness-on-팀 vs Harness-on-워크플로우 직접 비교 측정치는 없음. 비용/품질 델타는 일반 증거로부터 투영 → 도메인별 6-3 A/B로 실측 |
| **품질 주장 미검증** | 어드버서리얼 검증의 "more trustworthy" 이점은 정량 미검증 |
| **결정성 한계** | 제어 흐름은 결정적이나 각 `agent()` 내부 작업은 모델 주도(비결정적). 워크플로우는 *흐름*을 고정할 뿐 *내용*을 고정하지 않는다 |

> 출처: Claude Code 공식 문서(workflows / agent-teams / sub-agents), Anthropic 멀티에이전트 리서치 시스템 엔지니어링 글, CrewAI Flows · LangGraph-Swarm 문서. 상세 인용은 본 변경의 리서치 보고서 참조.
