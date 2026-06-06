# Handoff — dynamic workflow 통합 작업

> **작성:** 2026-06-06 · **브랜치:** `main` (origin과 동기) · **다음 세션용 인계 노트**

## 1. 지금까지 한 일 (완료, 푸시됨)

Claude Code의 **dynamic workflow(Workflow 도구)**를 Harness 팩토리에 4번째 실행 모드로 통합했다. 전부 문서(스킬 prompt) 변경이며 런타임 리스크 없음.

**커밋 히스토리 (origin/main):**
```
03f0164  docs: 리뷰 findings F3-F5 (QA 매핑 / eval 스키마 / flag 의존 다변화)
ddaa3fc  feat: F1/F2/F6 (eval 하네스 §9 / 예시 변형 / args 검증)
b812f67  docs(changelog): 워크플로우 모드 + 모델 티어링 기록
0f39462  Merge: Workflow 4번째 실행 모드
a9561d7  test: Template D 파일럿 실측 (4 agents / 168K tokens / ~197s)
e0a64fc  feat: workflow-mode.md + SKILL.md 통합
```

**핵심 산출물:**
- `skills/harness/references/workflow-mode.md` — 워크플로우 모드 가이드(프리미티브·6패턴 매핑·Template D·모델 티어링·한계). **단일 진실 출처(SSOT)**.
- `SKILL.md` 2-1 모드 표에 워크플로우 행 + 규모 우선 의사결정 / `:93` opus 전면강제 → 단계별 티어링 / 6-2 검증 항목.
- `skill-testing-guide.md` §9 — 워크플로우 eval 하네스. `skill-writing-guide.md` §7-4, `qa-agent-guide.md` §3-5, `team-examples.md` 예시 1·3·5 변형.
- `_workspace/pilot_workflow/` — 실제로 돌린 파일럿(스크립트 + 4 산출물). Template D 작동·실측 증거.

**딥 리뷰 findings 상태:** F1·F2·F3·F4·F5·F6 **전부 반영 완료.**

---

## 2. 다음 작업 (우선순위)

### 🔴 P0 — repo 정체성 불일치 (런치 전 필수, 파일럿이 발견·검증)
remote는 `tobyilee/dynamic-harness`인데 README는 전부 `revfactory/harness`를 가리킴.
- **결정 필요:** 어느 쪽이 canonical인가? (이 fork가 집이면 전부 `tobyilee/dynamic-harness`로 정렬 / `revfactory/harness`가 upstream이면 단순 fork로 두고 조치 없음)
- **대상:** `README.md`(배지 11, star-history 47-49, install 84), `README_KO.md`, `README_JA.md`, `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json`(homepage/repository)
- **상세 체크리스트:** `_workspace/pilot_workflow/04_strategist_launch_plan.md` §1 P0-1~P0-4
- **검증:** `grep -rn "revfactory/harness"` → 0 hit (정렬 완료 시)

### 🟠 P1 — 1.3.0 릴리스 끊기
`CHANGELOG.md` `[Unreleased]`에 워크플로우 모드 + 모델 티어링 + F1-F6가 누적됨 → **`## [1.3.0] - <날짜>` 섹션으로 승격**.
- 버전 정합: `plugin.json`(현재 1.2.0) / `marketplace.json`(1.2.0) / README 배지 3종 → 1.3.0
- 태그 + GH release (`experimental-dependency.md` Scenario A가 권하는 패턴; 현재 태그드 릴리스 0건)

### 🟡 P2 — 실측 A/B (리서치가 못 푼 핵심 질문)
"agent-teams vs 워크플로우 모드, 같은 도메인에서 실제 비용/품질 델타는?" — **측정 없이는 답 못 함.**
- 현재 데이터: 투영치 + 파일럿 1점(168K tokens / 3m17s, n=1). 분산 미측정.
- 방법: Harness 자체 With/Without eval 하네스(`SKILL.md` 6-3, `skill-testing-guide.md` §9)로 두 모드를 비교.
- 선행: 아래 P3(§9를 실행 가능 스크립트로) 하면 측정 도구가 생김.

### 🟡 P3 — §9 eval 하네스를 실행 가능 스크립트로 (F1 후속)
F1은 현재 **문서(스케치)만**. 실제 `scripts/eval-workflow.js`로 구현하면 P2 측정에 바로 사용. `pipeline(prompts, with/baseline parallel → Grader → Comparator)` + `schema` + `budget`.

### ⚪ P4 — 정리·확산 (선택)
- `_workspace/pilot_workflow/` 유지 vs 정리 결정 (현재 증거로 커밋됨).
- `team-examples.md` 예시 2(소설)·4(코드리뷰)는 통신 중심이라 팀 유지로 판단했음 — 재검토 여지.
- `handoff.md`(이 파일) 커밋 여부 / `.gitignore` 추가 여부 결정.

---

## 3. 핵심 포인터

- **워크플로우 모드 SSOT:** `skills/harness/references/workflow-mode.md`
- **파일럿 스크립트:** `_workspace/pilot_workflow/launch-workflow.js` (재실행: `Workflow({scriptPath, args:{repo, goalDate}})`)
- **실측:** 파일럿 4 agents / 168,291 tokens / 28 tool calls / 197s. deep-research 101 agents / 2.9M / 14.5min.
- **리서치 근거:** deep-research 1회 수행(19 소스, 95 주장→25 검증→23 확정). 결론은 커밋 메시지 `e0a64fc`·`ddaa3fc`와 `workflow-mode.md`에 반영됨. (원본 temp 출력은 비영속일 수 있음.)

## 4. 열린 질문 / 주의
- **Workflow 도구는 research preview**(v2.1.154+). API 변경 가능 → 생성 템플릿은 버전 게이팅·폴백 유지.
- 재개(`runId`)는 **same-session 한정**. cross-session 영속은 `_workspace/` 스냅샷 병행.
- opus 완화는 **비용 근거로만** — 혼합 티어 품질 향상 주장(90.2%)은 검증에서 폐기됨. 품질은 P2에서 실측.
- 워크플로우 모드는 experimental-flag 의존을 **다변화**할 뿐 GA 탈출 아님(둘 다 preview). 컴플라이언스 답 아님.
