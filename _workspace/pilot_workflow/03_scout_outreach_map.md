# Harness — 아웃리치 타겟 맵

> **프로젝트**: Harness — Claude Code Plugin (L3 Meta-Factory / Team-Architecture Factory)
> **한 줄 정의**: 도메인 한 문장 → 6개 팀 아키텍처 패턴 중 하나로 에이전트 팀 + 스킬 자동 생성
> **GitHub**: https://github.com/revfactory/harness
> **목표**: GitHub Trending 진입 + Claude Code 커뮤니티 확산
> **작성일**: 2026-06-06 · 작성자: community-scout

---

## 0. 포지셔닝 핵심 (모든 메시지의 뿌리)

아웃리치 메시지를 쓸 때 반드시 이 3개 축 중 하나에 걸어라:

1. **"메타-스킬" 앵글** — 스킬을 만드는 스킬. "build a harness for this project" 한 마디로 `.claude/agents/` + `.claude/skills/`가 생성됨. (신기함/바이럴 후크)
2. **"팀 아키텍처" 앵글** — 6개 패턴(Pipeline, Fan-out/Fan-in, Expert Pool, Producer-Reviewer, Supervisor, Hierarchical Delegation). 멀티 에이전트를 손으로 배선하던 사람들에게 직접적 가치. (기술 신뢰)
3. **"증거" 앵글** — +60% 평균 품질(49.5 → 79.3), 15/15 승률, −32% 분산. **반드시 한 문장 안에 "n=15, 저자 측정 A/B, 제3자 재현 대기 중" 디스클로저를 함께** 붙인다. (HN/기술 커뮤니티에서 과장 의심 차단 — 이게 신뢰의 핵심)

> 차별화 라인: "Archon은 런타임 설정 팩토리, Harness는 팀 아키텍처 팩토리 — 같은 L3의 이웃 서브레이어다." 경쟁이 아니라 공존 프레임을 쓰면 인접 커뮤니티의 방어를 낮춘다.

---

## 1. Awesome Lists (장기 발견성 — 디스커버리 SEO)

### Tier 1 (필수, 런치 ±1일)

| 리스트 | 제출 방식 | 메시지 앵글 |
|--------|-----------|-------------|
| **awesome-claude-code** (hesreallyhim, ~20k+) | PR 정책 확인 필수(메인테이너만 PR 가능한 경우 추천 이슈로 제출) | 메타-스킬 앵글 + 카테고리: Plugins/Orchestration |
| **awesome-claude-code** (jqueryscript) | PR (tools/plugins 섹션) | 동일, 플러그인 마켓플레이스 설치 한 줄 강조 |
| **awesome-claude-skills** (travisvn, ComposioHQ) | PR (CONTRIBUTING 준수, social proof 필요) | "스킬을 생성하는 스킬" — 이 리스트들의 메타 항목으로 포지셔닝 |

### Tier 2 (권장, 런치 주간)

| 리스트 | 제출 방식 | 메시지 앵글 |
|--------|-----------|-------------|
| **awesome-llm-agents** / **awesome-agents** (kyrolabs) / **awesome-ai-agents** (slavakurilyak) | PR (frameworks 섹션) | 팀 아키텍처 앵글 — "agent team factory" 표현 사용 |
| **Awesome-Prompt-Engineering** (promptslab, ~50k+) | PR (tools 섹션) | Progressive Disclosure 기반 스킬 생성 강조 |

### Tier 3 (보너스, 런치 +1~2주)

- 나머지 awesome-claude / awesome-ai-agents 롱테일 리스트 PR (jim-schwoebel, webfuse-com, BehiSecc 등) — 발견성 누적용.

---

## 2. Communities (실시간 확산 — 가장 높은 ROI)

### Reddit

| 서브레딧 | 규모 | 자기홍보 규칙 | 티어 | 메시지 앵글 |
|----------|------|---------------|------|-------------|
| **r/ClaudeAI** | ~600k | 가치 제공 중심 OK, 노골적 광고 금지 | **Tier 1** | 사용 사례 중심. "에이전트 팀을 손으로 안 짜고 한 문장으로 생성" + before/after 예시 |
| **r/SideProject** | ~250k | 자기홍보 허용 | **Tier 1** | 빌드 스토리 + harness-100(100개 하네스 생산) 사회적 증거 |
| **r/opensource** | ~300k | OSS 공유 권장 | **Tier 1** | Apache 2.0, 순수 마크다운, 런타임 의존성 없음 강조 |
| **r/LocalLLaMA** | ~1M | 10% 규칙, 기술 심층 선호 | Tier 2 | 아키텍처 패턴 심층 + A/B 측정 방법론 공유(증거 앵글) |
| **r/programming** | ~6M | 엄격, 기술적 가치 필수 | Tier 2 | "구조화된 사전설정이 LLM 코드 에이전트 품질에 미치는 영향" 연구 앵글 |
| **r/ChatGPTCoding** / **r/AI_Agents** | ~수십만 | 프로젝트 쇼케이스 가능 | Tier 2 | 멀티 에이전트 배선 자동화 앵글 |
| **r/MachineLearning** | ~3M | 학술/연구 중심 | Tier 3 | [P] 태그 + 측정 결과 디스클로저 동반 |

**포스팅 타이밍**: 화~목 오전 9–11시 EST. 같은 주에 동일 콘텐츠 다중 서브레딧 동시 투하 금지(스팸 플래그) — 1일 1서브레딧 간격.

### Hacker News

| 방식 | 티어 | 메시지 앵글 |
|------|------|-------------|
| **Show HN** | **Tier 1 (핵심)** | 제목에 "meta-skill" + "agent teams" 키워드. 본문 첫 줄에 무엇/왜. **+60% 수치는 반드시 디스클로저 동반** — HN은 과장에 가장 가혹하므로 솔직함이 곧 신뢰 |
| **댓글 대응 준비** | Tier 1 | "Archon과 뭐가 다른가?" "Claude Code 전용은 너무 좁지 않나?" "n=15는 너무 적지 않나?" — README FAQ Q1~Q3 답변을 미리 준비 |

### Discord / Slack

| 채널 | 티어 | 메시지 앵글 |
|------|------|-------------|
| **Anthropic/Claude 공식 Discord** #showcase / #community-projects | **Tier 1** | 데모 GIF + 한 문장 트리거. 공식 하이라이트 노림 |
| **AI 엔지니어 / Latent Space Discord** | Tier 2 | 팀 아키텍처 패턴 토론 유발 |

---

## 3. Newsletters (도달 폭 — 패시브 픽업)

### Tier 1

| 뉴스레터 | 제출 방법 | 메시지 앵글 |
|----------|-----------|-------------|
| **TLDR AI / TLDR Open Source** | tldr.tech 제출, GitHub trending 자동 픽업 | 한 줄 후크: "스킬을 만드는 스킬" |
| **Ben's Bites** | news.bensbites.com 커뮤니티 투표 | 신기함 앵글(메타-스킬) |
| **Console.dev** | 개발자·셀프서비스·OSS 도구 자동 발굴 — 선정 기준 충족 확인 | 무설정 설치 + Apache 2.0 |

### Tier 2

| 뉴스레터 | 제출 방법 | 메시지 앵글 |
|----------|-----------|-------------|
| **The Rundown AI / Superhuman AI / The Neuron** | 편집팀 이메일 / 트렌딩 자동 픽업 | 일반 AI 독자용으로 "에이전트 팀 자동 설계" 단순화 |
| **Changelog Weekly / Alpha Signal** | changelog.com 제출 / GitHub 트렌딩 트래킹 | OSS·기술 앵글 + 연구 결과 |

---

## 4. Influencers / KOL (증폭기)

| 대상 | 채널 | 티어 | 접근 메시지 앵글 |
|------|------|------|------------------|
| **Anthropic 공식 / Claude 공식** (@AnthropicAI, @claudeai) | X | **Tier 1** | 공식 RT/하이라이트 노림. 깔끔한 데모 + Agent Teams 기능 활용 강조 |
| **Boris Cherny** (@bcherny) 등 Claude Code 코어 | X | **Tier 1** | 기술 DM — Agent Teams 실사용 사례로서 Harness |
| **Claude Code 튜토리얼 유튜버** (에이전트 팀 전문 채널) | YouTube/X | **Tier 1** | "이 한 플러그인으로 영상 한 편 분량 데모 가능" — 워크스루 제안 |
| **AI 자동화 교육 크리에이터** (대형 채널) | YouTube | Tier 2 | 일반 AI 청중용 — 한 문장으로 팀 생성 데모 |
| **freeCodeCamp / 개발 교육자** | YouTube/X | Tier 2 | 강좌 소재 제보 — 6패턴 교육 콘텐츠 |

**DM 원칙**: 칭찬 한 줄 → 한 문장 가치 → 링크 → 워크스루 제안. 길게 쓰지 말 것.

---

## 5. Aggregators (자동 노출)

| 플랫폼 | 방법 | 티어 |
|--------|------|------|
| **GitHub Trending** | 런치 당일 스타 집중 → 자동 노출 | **Tier 1 (최종 목표)** |
| **Product Hunt** | "AI Coding Agents" 카테고리, 헌터 사전 섭외 | **Tier 1** |
| **Trendshift** | GitHub Trending 자동 트래킹, 뱃지 임베드 | Tier 1 |
| **Dev.to** | 기술 블로그 크로스포스트 | Tier 2 |
| **Star History / GitNews / bestofshowhn / awesomeclaude.ai** | 자동/수동 등록 | Tier 2 |

---

## 우선순위 종합

### Tier 1 — 런치 ±1일 (최고 임팩트)
1. **Show HN** (디스클로저 동반 수치)
2. **Product Hunt** 런치 (헌터 사전 섭외)
3. **Reddit** — r/ClaudeAI, r/SideProject, r/opensource (1일 1서브레딧 간격)
4. **Anthropic Discord** #showcase
5. **X 런치 스레드** + 공식 계정/코어 인플루언서 DM
6. **awesome-claude-code/skills** Tier 1 PR·추천 제출
7. **Ben's Bites** 커뮤니티 투표

### Tier 2 — 런치 주간 (중간 임팩트)
1. r/LocalLLaMA, r/programming, r/AI_Agents 심층 포스트
2. awesome-llm-agents / awesome-agents PR
3. TLDR AI / The Rundown / Console.dev 접촉
4. Dev.to 기술 블로그
5. YouTube 크리에이터 워크스루 제안

### Tier 3 — 런치 +1~2주 (장기 발견성)
1. 롱테일 awesome list PR
2. r/MachineLearning [P] 쇼케이스
3. 나머지 뉴스레터 + awesomeclaude.ai 등록

---

## 접근 템플릿

### A. Show HN
```
Title: Show HN: Harness – a meta-skill that designs Claude Code agent teams

Harness turns one sentence ("build a harness for this project") into a full
agent team — it generates .claude/agents/ and .claude/skills/ using 6 team
architecture patterns (Pipeline, Fan-out/Fan-in, Expert Pool, Producer-Reviewer,
Supervisor, Hierarchical Delegation).

It's a "meta-skill": a skill that creates other skills. Pure Markdown, no runtime,
Apache 2.0. In an author-measured A/B (n=15, third-party replications pending) it
improved avg output quality +60% (49.5 → 79.3) with 15/15 wins.

https://github.com/revfactory/harness
```

### B. Reddit (r/ClaudeAI / r/SideProject)
```
Title: I built a Claude Code plugin that designs entire agent teams from one sentence

Tired of hand-wiring multi-agent setups, I built Harness — a "meta-skill" plugin.
Say "build a harness for this project" and it picks one of 6 team architecture
patterns and generates the agents + skills for you.

- 6 patterns: Pipeline, Fan-out/Fan-in, Expert Pool, Producer-Reviewer,
  Supervisor, Hierarchical Delegation
- Progressive Disclosure for context efficiency
- Pure Markdown, no runtime deps, Apache 2.0

Author-measured A/B (n=15, replications pending): +60% avg quality, 15/15 wins.

https://github.com/revfactory/harness
What team patterns do you use? Feedback welcome.
```

### C. Influencer DM (X)
```
Hey [Name] — big fan of your Claude Code work.

Built something you might like: Harness, a meta-skill plugin that designs whole
agent teams. Say "build a harness for this project" → it generates agents + skills
using 6 architecture patterns. Pure Markdown, Apache 2.0.

https://github.com/revfactory/harness
Happy to do a quick walkthrough if useful!
```

### D. Newsletter 피치
```
Subject: Harness — a meta-skill that designs AI agent teams for Claude Code

Hi [Name],

Harness is an open-source Claude Code plugin. One prompt and it generates
specialized agents (.claude/agents/), domain skills (.claude/skills/), and team
orchestration across 6 architecture patterns. It's a "skill that creates skills."

Author-measured A/B (n=15, third-party replications pending): +60% avg quality.
No runtime deps, Apache 2.0.

https://github.com/revfactory/harness

Would love for [Newsletter] readers to see it. — Robin
```

### E. Awesome List PR
```
Add Harness — meta-skill that designs Claude Code agent teams + skills.
6 architecture patterns, Progressive Disclosure, Apache 2.0.
Category: Plugins / Agent Frameworks / Orchestration.
https://github.com/revfactory/harness
```

---

## 핵심 체크리스트
- [ ] 런치 전: PH 헌터 섭외, 인플루언서 사전 DM, HN FAQ 답변 준비(Q1 수치/Q2 Archon/Q3 Claude 전용)
- [ ] 런치 당일: Show HN + Product Hunt + Reddit(3개) + X 스레드 + awesome PR(Tier1) + Discord
- [ ] 런치 +1일: Ben's Bites 투표, 인플루언서 RT 팔로업
- [ ] 런치 +2~3일: TLDR / Rundown / Console.dev 접촉, Tier2 Reddit 심층 포스트
- [ ] 런치 +1주: Tier2 awesome PR, Dev.to, YouTube 크리에이터
- [ ] 런치 +2주: Tier3 롱테일, 나머지 뉴스레터, awesomeclaude.ai
- [ ] **전 채널 공통**: +60% 수치는 절대 단독 사용 금지 — 항상 "n=15, 저자 측정, 재현 대기" 동반
