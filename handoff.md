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
- `_workspace/eval_pilot/` — §9 eval 하네스 실행 구현(`eval-workflow.js`, 2-suite) + 스킬 2종 + 결과. 스킬 with/baseline 측정 시연(P3).

**딥 리뷰 findings 상태:** F1·F2·F3·F4·F5·F6 **전부 반영 완료.**

---

## 2. 다음 작업 (우선순위)

### ✅ P0 — repo 정체성 정렬 (완료: dynamic-harness로 리브랜드)
식별 링크(README 배지·star-history·install, `plugin.json` homepage/repository, docs·index.html·privacy·이슈템플릿·CONTRIBUTING discussions)를 `revfactory/harness` → **`tobyilee/dynamic-harness`**로 통일. 원저자 attribution(author·marketplace owner·논문·형제 저장소)은 Apache 2.0에 따라 보존. `git grep "revfactory/harness"` → 형제(`harness-100`/`claude-code-harness`)·attribution·_workspace 증거만 남음.

### ✅ P1 — 1.3.0 릴리스 (완료)
`CHANGELOG.md` `[Unreleased]` → `[1.3.0] - 2026-06-07` 승격. `plugin.json`/`marketplace.json` `1.2.0`→`1.3.0`, README 배지 3종 정합. `git tag v1.3.0` + GitHub Release 발행 (태그드 릴리스 0건 상태 해소).

### 🟡 P2 — agent-teams vs workflow 모드 A/B (방법론 + 부분 데이터 전달; 완전 실측 보류)
정직한 통제 A/B는 **텔레메트리 비대칭**(Workflow는 usage 네이티브 반환, agent-teams는 per-run 합산 미제공 → 세션 usage 외부 회계 필요) + experimental 플래그 + 분산(N≥3) 때문에 단발 실행으로는 오해를 부른다.
- **전달:** `_workspace/P2-mode-ab-analysis.md` — 차단 원인, 보유 실측(workflow 2점: 168K/197s·282K/34s), 문서화된 특성, 통제 A/B 절차.
- **방향성(근거 O):** 대규모 팬아웃·결정적·반복 작업에서 workflow 우위(컨텍스트 격리 + 선형 비용 회피).
- **정량(미측정):** 특정 작업의 % 델타는 플래그 켠 별도 세션 + 세션 usage diffing + N≥3 필요. (이번 P3 eval 하네스의 with/baseline 채점 패턴은 재사용 가능하나 "모드 비교"는 별도 셋업.)

### ✅ P3 — §9 eval 하네스 실행 스크립트화 (완료, F1 후속)
`_workspace/eval_pilot/eval-workflow.js`로 구현·실행됨(2-suite, 16 agents / 282K tokens / ~34s).
- 결과: 비차별 eval(Conventional Commits) **lift=0**, 차별 eval(커스텀 `[ABC-n]` 티켓 프리픽스) **lift=+0.5** → 하네스가 스킬 가치를 실제로 측정함을 시연(§4-3 non-discriminating 함정 → 해결).
- `pipeline(tasks, with/baseline parallel → schema grade)` + JS 결정적 win-rate. 보안: name/iter strict allowlist로 path traversal 차단.
- **P2(실측 A/B)의 도구로 재사용 가능** — 단, P2는 "agent-teams vs workflow 모드" 비교라 별도 셋업 필요(이 하네스는 "스킬 with/baseline" 패턴).

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
