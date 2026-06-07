# Handoff — Dynamic-Harness

> **갱신:** 2026-06-07 · **브랜치:** `main` (origin과 동기) · **릴리스:** v1.3.0 (태그 + GH Release) · **다음 세션용 인계 노트**

이 저장소는 **Dynamic-Harness** — [Harness](https://github.com/revfactory/harness)를 포크해 Claude Code의 동적 **Workflow 도구**를 4번째 실행 모드로 적용한 프로젝트.

---

## 1. 이번 세션에 완료한 것 (전부 origin/main에 푸시됨)

### dynamic workflow 통합 (4번째 실행 모드)
- `skills/harness/references/workflow-mode.md` — **워크플로우 모드 SSOT** (프리미티브·6패턴↔프리미티브 매핑·Template D·모델 티어링·예산·재개·한계).
- `SKILL.md` — 2-1 모드 표에 워크플로우 행 + 규모 우선 의사결정 / `:93` opus 전면강제 → **비용 근거 단계별 티어링** / 6-2 워크플로우 검증.
- `orchestrator-template.md` Template D 포인터.

### 딥 리뷰 findings F1–F6 (전부 반영)
- F1 `skill-testing-guide.md` §9 워크플로우 eval 하네스 / F2 `team-examples.md` 예시 1·3·5 변형 / F3 `qa-agent-guide.md` §3-5 / F4 `skill-writing-guide.md` §7-4 / F5 `docs/experimental-dependency.md` 의존 다변화 / F6 Template D args 검증.

### 실행 가능 워크플로우 2종 (실측·커밋됨)
- `_workspace/pilot_workflow/launch-workflow.js` — 팬아웃/팬인 (4 agents / 168K tokens / 197s).
- `_workspace/eval_pilot/eval-workflow.js` — 스킬 with/baseline eval, 2-suite (16 agents / 282K / 34s). 보안: name/iter strict allowlist(path traversal 차단).

### P0 — 정체성 정렬 (완료)
- **슬러그**(P0): README 배지·star-history·install, `plugin.json` homepage/repository, docs·index.html·privacy·이슈템플릿·CONTRIBUTING → `revfactory/harness` → `tobyilee/dynamic-harness`.
- **README narrative 리브랜드**(EN/KO/JA): 프로젝트명을 **Dynamic-Harness**로, 포크 계보 설명을 앞에 배치. upstream Harness(+60% 연구·논문·harness-100·형제)는 "upstream"으로 명시 보존(Apache 2.0 + 정직성).

### P1 — v1.3.0 릴리스 (완료)
- CHANGELOG `[Unreleased]`→`[1.3.0] - 2026-06-07`, `plugin.json`/`marketplace.json` 1.3.0, 배지 정합. `git tag v1.3.0` + [GitHub Release](https://github.com/tobyilee/dynamic-harness/releases/tag/v1.3.0).

### P3 — §9 eval 하네스 실행 스크립트화 (완료)
- 결과: 비차별 eval(Conventional Commits) **lift=0**, 차별 eval(커스텀 `[ABC-n]` 프리픽스) **lift=+0.5** → 하네스가 스킬 가치를 정직하게 측정함을 시연.

**커밋 히스토리 (this session):**
```
481a4f0 docs: rebrand README project identity to Dynamic-Harness (EN/KO/JA)
7de1d22 docs: surface Workflow execution mode in README
ca046b2 docs(P2): agent-teams vs workflow A/B — methodology + partial data
502a400 release: v1.3.0 + 리브랜드(슬러그)
06e9cd2 test: runnable §9 eval harness (lift 0 vs +0.5)
3447b3d docs: add handoff.md
03f0164 docs: F3-F5 / ddaa3fc feat: F1/F2/F6 / b812f67 changelog
0f39462 Merge / a9561d7 launch pilot / e0a64fc workflow-mode+SKILL
```

---

## 2. 남은 작업 (우선순위)

### 🟡 P2 — agent-teams vs workflow 모드 A/B (방법론 전달; 정량 실측 미완)
정직한 통제 A/B는 **텔레메트리 비대칭**(Workflow는 usage 네이티브 반환 / agent-teams는 per-run 합산 미제공 → 세션 usage 외부 회계 필요) + experimental 플래그 + 분산(N≥3) 때문에 단발 실행으로는 오해를 부른다.
- 전달: `_workspace/P2-mode-ab-analysis.md` (차단 원인·보유 실측·통제 절차).
- **다음:** 플래그 켠 별도 세션에서 동일 작업 N≥3회 + 세션 usage diffing으로 정량 측정.

### 🟠 잔여 리브랜드 일관성
- **`index.html`(41) / `privacy.html`(14)** — 슬러그는 P0에서 바뀌었으나 **프로젝트명 narrative가 아직 "Harness"**. README와 맞추려면 Dynamic-Harness로 narrative 리브랜드 필요(랜딩/프라이버시 페이지). upstream 참조(논문·harness-100·연구)는 README와 동일 기준으로 보존.
- `skills/harness/references/workflow-mode.md` 예시 주석의 `repo: "revfactory/harness"` (illustrative arg, 무해하나 정리 가능).

### 🟢 릴리스 후속
- `CHANGELOG.md` `[Unreleased]`에 README 리브랜드 + 모드표 동기화 누적 → 적절한 시점에 **v1.3.1**로 끊기.
- (선택) `marketplace.json` owner / `plugin.json` author: 현재 원저자 attribution 유지. 완전한 소유권 이전을 원하면 별도 결정.

### ⚪ 정리 (선택)
- `_workspace/`의 파일럿/분석 산출물 유지 vs 정리. `team-examples.md` 예시 2·4 워크플로우 변형 재검토 여지.

---

## 3. 핵심 포인터
- **워크플로우 모드 SSOT:** `skills/harness/references/workflow-mode.md`
- **파일럿 재실행:** `Workflow({scriptPath: "_workspace/eval_pilot/eval-workflow.js"})` (자기완결형, args 불필요) / launch는 `args:{repo, goalDate}` 필요.
- **리서치 근거:** deep-research 1회(19 소스→25 검증→23 확정). 결론은 `workflow-mode.md` + 커밋 메시지에 반영(원본 temp 출력은 비영속).

## 4. 열린 질문 / 주의
- **Workflow 도구는 research preview**(v2.1.154+). API 변경 가능 → 생성 템플릿 버전 게이팅·폴백 유지.
- 재개(`runId`)는 **same-session 한정**. cross-session 영속은 `_workspace/` 스냅샷 병행.
- opus 완화는 **비용 근거로만** — 혼합 티어 품질 향상 주장(90.2%)은 검증에서 폐기. 품질은 P2에서 실측.
- 워크플로우 모드는 experimental-flag 의존을 **다변화**할 뿐 GA 탈출 아님(둘 다 preview). 컴플라이언스 답 아님.
- **scriptPath + 깊게 중첩된 args 주입은 불안정**(eval 파일럿에서 확인) → 복잡 입력은 in-script 상수로.
