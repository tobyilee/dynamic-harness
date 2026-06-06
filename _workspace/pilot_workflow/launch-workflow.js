// Template D 파일럿 — 실제 런치 하네스(팬아웃/팬인)를 Workflow 도구로 구현.
// 기존 _workspace/01..04 (모델 주도 팀 런)과 동일 작업을 워크플로우 모드로 재현해
// 토큰/시간을 실측하고 Template D가 실제로 돌아가는지 검증한다.
export const meta = {
  name: 'launch-harness-pilot',
  description: 'Pilot: fan-out 자료 수집(audit/content/scout) 후 strategist 팬인 통합 런치 플랜. Template D 검증용.',
  phases: [{ title: 'Collect' }, { title: 'Synthesize' }],
}

const OUT = '/Users/tobylee/workspace/ai/dynamic-harness/_workspace/pilot_workflow'

const SUMMARY_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: '산출물 제목' },
    gist: { type: 'string', description: '3-5문장 핵심 요약' },
    file: { type: 'string', description: 'Write로 기록한 산출물 절대경로' },
    keyPoints: { type: 'array', items: { type: 'string' }, description: '상위 3-5개 핵심 포인트' },
  },
  required: ['title', 'gist', 'file'],
}

log(`Pilot launch harness — repo=${args.repo}, goalDate=${args.goalDate}`)

// === Phase 1: 팬아웃 (parallel = 배리어) ===
phase('Collect')
const COLLECTORS = [
  {
    name: 'auditor',
    prompt: `당신은 repo-auditor다. 현재 작업 디렉토리의 저장소(${args.repo})를 GitHub Trending 준비도 관점에서 감사하라. README.md, .claude-plugin/plugin.json, skills/harness/SKILL.md 와 구조를 Read로 읽고 강점/약점/리스크/개선 제안을 평가한다. 결과를 마크다운으로 ${OUT}/01_auditor_repo_audit.md 에 Write로 저장하라. 반환은 schema 형식의 핵심 요약만(본문 전체를 반환하지 말 것).`,
  },
  {
    name: 'content',
    prompt: `당신은 content-creator다. ${args.repo}(Claude Code 플러그인 — 에이전트 팀 & 스킬 아키텍트)의 GitHub Trending 런치용 멀티 플랫폼 콘텐츠 초안을 작성하라: (1) Hacker News "Show HN" 제목+본문, (2) Reddit r/programming 스타일 게시물, (3) X/Twitter 스레드 3트윗. 결과를 ${OUT}/02_content_launch_contents.md 에 Write로 저장하라. 반환은 schema 형식의 핵심 요약만.`,
  },
  {
    name: 'scout',
    prompt: `당신은 community-scout다. ${args.repo}를 확산시킬 아웃리치 타겟 맵을 작성하라 — 관련 커뮤니티/서브레딧/뉴스레터/인플루언서 카테고리와 각 채널별 접근 메시지 앵글, 우선순위. 결과를 ${OUT}/03_scout_outreach_map.md 에 Write로 저장하라. 반환은 schema 형식의 핵심 요약만.`,
  },
]
const collected = (await parallel(
  COLLECTORS.map(c => () => agent(c.prompt, { label: c.name, phase: 'Collect', schema: SUMMARY_SCHEMA }))
)).filter(Boolean)
log(`Collected ${collected.length}/${COLLECTORS.length} artifacts`)

// === Phase 2: 팬인 (strategist가 3개 산출물을 종합) ===
phase('Synthesize')
const plan = await agent(
  `당신은 launch-strategist다. 아래 세 산출물을 종합해 ${args.repo}의 GitHub Trending 통합 런치 플랜(목표일 ${args.goalDate})을 작성하라. 각 산출물 파일을 Read로 읽고, 타임라인·채널별 실행 순서·리스크 대응을 포함하라. 결과를 ${OUT}/04_strategist_launch_plan.md 에 Write로 저장하라. 반환은 플랜 핵심 요약(5-8문장).\n\n수집된 산출물:\n` +
    collected.map(s => `- ${s.title} (${s.file}): ${s.gist}`).join('\n'),
  { label: 'strategist', phase: 'Synthesize' }
)

return {
  plan,
  collectedCount: collected.length,
  outputs: [...collected.map(s => s.file), `${OUT}/04_strategist_launch_plan.md`],
}
