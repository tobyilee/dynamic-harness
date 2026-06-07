# Changelog

이 프로젝트는 [Semantic Versioning](https://semver.org/)을 따릅니다.

## [Unreleased]

### Changed
- **README(EN/KO/JA) 프로젝트 정체성 리브랜드** — 프로젝트명을 **Dynamic-Harness**(Harness 포크 + 동적 Workflow 적용)로 표기. 타이틀·인트로에 포크 계보 설명을 앞세우고, 이후 this-project 서술 전반에 Dynamic-Harness 사용(개요·카테고리·공존·산출물·FAQ·헤딩 앵커). **upstream Harness의 +60% 연구·논문·harness-100은 "upstream Harness"로 명시 보존** — Apache 2.0 attribution + 정직성(포크가 +60%를 측정한 게 아님을 블록쿼트로 명시)
- **README(EN/KO/JA) 실행 모드 표 동기화** — v1.3.0이 추가한 **워크플로우(4번째 모드)**와 기존 **하이브리드** 행을 사용자 대면 README에 노출(기존 표는 팀/서브 2개만 표기). "에이전트 팀"을 "소규모 협업 기본"으로 명확화

## [1.3.0] - 2026-06-07

### Added
- **Phase 2-1: 워크플로우 실행 모드 (4번째 모드)** — Claude Code **Workflow 도구** 기반 결정적 오케스트레이션. 팀/서브/하이브리드(모두 모델 주도)와 달리 JS 스크립트가 제어 흐름(루프·분기·중간결과)을 보유. 수십~수백 에이전트 팬아웃·결정적 시퀀스·반복 실행·같은 세션 재개에 사용 (Workflow 도구는 **research preview**, v2.1.154+ — 생성 템플릿은 버전 게이팅 + 팀/하이브리드 폴백)
- **`references/workflow-mode.md`** — 워크플로우 모드 가이드 (신규, ToC 포함): 모드 선택 루브릭(규모·반복성·재개), 프리미티브(`agent`/`pipeline`/`parallel`/`phase`/`schema`/`budget` + 캡·제약), 6패턴↔프리미티브 매핑, **Template D**(오케스트레이터 스킬 + 번들 스크립트), 품질 패턴(어드버서리얼 검증·loop-until-dry), 모델 티어링·토큰 예산, `_workspace/` 감사추적 유지법, 한계
- **오케스트레이터 Template D 포인터** — `references/orchestrator-template.md`에 워크플로우 모드 템플릿(A/B/C와 같은 자리) 추가
- **Phase 6-2: 워크플로우 모드 검증 항목** — `meta` 순수 리터럴, `phase()`↔`meta.phases` 일치, `parallel`/`pipeline` 배리어 적합성, 각 `agent()`의 `_workspace/` 기록 지시, Workflow 불가 시 폴백 경로 확인
- **`skill-testing-guide.md` §9: 워크플로우 모드 eval 하네스** — Phase 6 eval(with/baseline 동시 스폰·Grader/Comparator/Analyzer·Train-Test 반복)을 `pipeline` + `schema` + `budget`으로 표현. 수동 토큰 캡처·`claude -p` 자동화 핵을 1급 프리미티브로 대체 + 수작업↔프리미티브 매핑표
- **`team-examples.md` 워크플로우 모드 변형 3종** — 예시 1(리서치 팬아웃/팬인 = `/deep-research` 패턴), 예시 3(웹툰 생성-검증, 재시도 상한을 JS 카운터로 강제), 예시 5(마이그레이션 감독자, `worktree` 격리 + 대규모 팬아웃 = 팀 모드 대비 최대 우위 사례)
- **Template D Phase 1: `args` 유효성 검증 단계** — 과거 날짜·누락 필드를 오케스트레이터가 거부/되묻기 (파일럿에서 과거 목표일이 조용히 우회된 실측 사례 반영)
- **`qa-agent-guide.md` §3-5: 워크플로우 모드 매핑** — §2의 4개 교차검증 = `parallel` 독립 차원, incremental QA = `pipeline`(배리어 없음) 매핑 + 스케치
- **`skill-writing-guide.md` §7-4: 워크플로우 모드에서의 스키마** — eval JSON 3종(metadata/grading/timing)이 Workflow `schema` 검증 + 네이티브 usage 반환으로 대체됨을 명시 (§9 매핑 연결)
- 신규 에이전트/스킬 생성 전 중복 검토 단계 (Phase 3-0, Phase 4-0)
- `references/agent-design-patterns.md` "에이전트 재사용 설계" 섹션
- `references/skill-writing-guide.md` §9 "스킬 재사용 설계"

### Changed
- **저장소 정체성 정렬 (rebrand)** — README(EN/KO/JA) 배지·star-history·install 명령, `plugin.json` homepage/repository, `docs/quickstart.md`, `index.html`, `privacy.html`, 이슈 템플릿·CONTRIBUTING의 discussions 링크를 `revfactory/harness` → **`tobyilee/dynamic-harness`**로 통일. 원저자 attribution(author·marketplace owner·논문·형제 저장소 `harness-100`/`claude-code-harness`)은 Apache 2.0에 따라 보존
- **버전 1.3.0** — `plugin.json`/`marketplace.json` `1.2.0` → `1.3.0`, README 배지 3종 동일 정합
- **Phase 2-1 실행 모드 의사결정 순서** — 규모·반복성 체크를 1순위로 전환(대규모 팬아웃·반복·재개는 워크플로우 우선). "에이전트 팀이 최우선 기본값"을 **소규모 협업**으로 한정 — 팀은 "세션당 1팀·토큰 선형 증가" 제약으로 대규모 팬아웃에 부적합
- **모델 설정 정책 완화** — `model: "opus"` 전면 강제 → **핵심 단계 opus + 단순·기계적 단계 하위 티어 허용**. 멀티 에이전트 토큰 비용(chat 대비 ~15배)을 고가치 단계에 집중. 티어 완화는 **비용 근거로만** 결정하고 품질 영향은 Phase 6-3 With/Without A/B로 도메인별 검증한 뒤 적용 (혼합 티어 품질 향상 주장은 검증에서 폐기되어 미인용)
- **산출물 체크리스트** — 실행 모드 항목에 워크플로우 추가(폴백 경로 명시), 모델 항목을 티어 설정으로 갱신
- **`docs/experimental-dependency.md`** — 의존성 그래프에 Workflow 도구를 병렬(역시 research preview) 경로로 추가, Scenario C에 워크플로우 폴백 명시. "GA 탈출이 아닌 2-프리뷰 회복탄력성"으로 정직하게 프레이밍(규제 산업 컴플라이언스엔 도움 안 됨 명기). Last updated 2026-06-06
- Phase 선택 매트릭스에 3-0/4-0 명시
- Phase 2-3에 재사용 검토 단계 포인터 추가
- 산출물 체크리스트에 재사용 검토 항목 2개 추가

---

## [1.2.1] - 2026-04-18

### Fixed

- **버전 정합성 동기화** — README.md / README_KO.md / README_JA.md 뱃지가 `v1.0.1`, `.claude-plugin/marketplace.json`이 `1.1.0`, `.claude-plugin/plugin.json`이 `1.2.0`으로 3중 불일치 → 모두 **v1.2.0**으로 통일 (plugin.json 기준)
- **태그드 릴리스 0건 상태 해소 준비** — v1.0.0 / v1.0.1 / v1.1.0 / v1.2.0 소급 태그 계획 작성 (`_workspace/release/audit-2026-04-18.md` §4 참조)

### Added

- **포지셔닝 선언: "harness factory"** — README 상단에 카테고리 자기 규정 문구를 도입. "에이전트 + 스킬을 도메인별로 찍어내는 하네스 팩토리"로 카테고리 선점 (단일 에이전트/프롬프트 프레임워크 대비 차별화)
- **CONTRIBUTING.md** — 기여 가이드 및 SLA 명시 (PR 1차 응답 72h, Issue triage 48h). 커뮤니티 온보딩 장벽 해소
- **docs/ 디렉토리** — 장기 문서(아키텍처, 마이그레이션, 패턴 카탈로그) 이전 공간 신설. README 비대화 방지 및 검색성 향상
- **Issue #3 응답 정책** — 커뮤니티 이슈에 대한 공식 응답 템플릿 및 트리아지 프로세스 추가

### Changed

- `.claude-plugin/marketplace.json` version: `1.1.0` → `1.2.0`
- README 뱃지 (EN/KO/JA 3종): `Version-1.0.1` → `Version-1.2.0`
- **`.claude-plugin/plugin.json` description 재작성** — `"Agent Team & Skill Architect — Meta-skill that designs..."` → `"The team-architecture factory for Claude Code — a meta-skill that turns a domain description into an agent team and the skills they use, with six pre-defined team-architecture patterns..."` (EN+KO 병기, L3 Meta-Factory 포지셔닝 반영)
- **`.claude-plugin/plugin.json` keywords 확장** — 5개 → 17개 (`harness-factory`, `team-architecture-factory`, `claude-code-plugin`, `agent-scaffolding`, `multi-agent`, 6패턴 키워드 6종 추가)

## [1.2.0] - 2026-04-08

### Changed

- **CLAUDE.md 등록 정책 간소화 (중복 제거)** — Phase 5-4 "컨텍스트 등록"을 "포인터 등록"으로 전환. 에이전트 목록·스킬 목록·디렉토리 구조·실행 규칙 상세를 CLAUDE.md에서 제거하고 **트리거 규칙 + 변경 이력**만 남김. 에이전트/스킬 목록은 `.claude/agents/`, `.claude/skills/` 및 오케스트레이터 스킬에서 단일 출처로 관리
- **Phase 3/4 임시 동기화 단계 삭제** — CLAUDE.md 동기화 부담을 줄이기 위해 Phase 3/4의 임시 동기화 지시 제거. 최종 포인터 등록은 Phase 5-4에서 1회만 수행
- **핵심 원칙 3번 재정의** — "CLAUDE.md에 하네스 컨텍스트를 등록한다" → "CLAUDE.md에 하네스 포인터를 등록한다"
- **CLAUDE.md vs 오케스트레이터 역할 분담표 삭제** — 포인터 정책으로 단순화되어 표 자체가 불필요해짐

### Added

- **Phase 2-1: 하이브리드 실행 모드** — 에이전트 팀 / 서브 에이전트에 더해 Phase별로 모드를 섞는 하이브리드 패턴 추가. 자주 쓰이는 조합(병렬 수집→합의 통합, 팀 생성→검증, Phase 간 팀 재구성) 명시
- **Phase 2-1 실행 모드 비교표** — 팀/서브/하이브리드 3종 특성 및 의사결정 순서 3단계 제공
- **Phase 5-0 하이브리드 오케스트레이터 패턴** — 하이브리드 구성 시 각 Phase 상단에 실행 모드를 명시하는 규칙
- **Phase 5-1 반환값 기반 데이터 전달** — 서브 에이전트 모드 전용 데이터 전달 전략 추가 (기존 메시지/태스크/파일 + 반환값)
- **Phase 5-1 권장 조합 (서브/하이브리드)** — 팀 모드 외 서브 모드와 하이브리드에서의 데이터 전달 권장 조합 명시

## [1.1.0] - 2026-04-05

### Added

- **Phase 0: 현황 감사** — 트리거 시 기존 하네스 상태를 먼저 확인하고 신규 구축/기존 확장/운영·유지보수 3분기로 라우팅
- **기존 확장 Phase 선택 매트릭스** — 에이전트 추가/스킬 추가/아키텍처 변경별 필요 Phase를 명시한 결정표
- **Phase 3/4 CLAUDE.md 임시 동기화** — 에이전트·스킬 생성 직후 CLAUDE.md에 즉시 반영 (세션 중단 내성)
- **Phase 5-4: CLAUDE.md 하네스 컨텍스트 등록** — 에이전트 팀 구조·스킬 목록·실행 규칙·디렉토리 구조·변경 이력을 기록. CLAUDE.md vs 오케스트레이터 역할 분담표 포함
- **Phase 5-5: 후속 작업 지원** — 오케스트레이터 description에 후속 키워드 필수 포함, Phase 0 컨텍스트 확인 단계로 초기/부분재실행/새실행 자동 판별
- **Phase 5 오케스트레이터 수정 경로** — 기존 확장 시 오케스트레이터를 새로 만들지 않고 수정하는 가이드
- **Phase 7: 하네스 진화 메커니즘** — 실행 후 피드백 수집 → 피드백 유형별 수정 대상 매핑 → 변경 이력 기록 → 자동 진화 트리거
- **Phase 7-5: 운영/유지보수 워크플로우** — 현황 감사→점진적 수정→CLAUDE.md 동기화→변경 검증 4단계
- **description에 운영/유지보수 트리거** — '하네스 점검', '하네스 감사', '하네스 현황', '에이전트/스킬 동기화' 키워드
- **산출물 체크리스트 강화** — CLAUDE.md 동기화 완료, 변경 이력 기록, Phase 0 컨텍스트 확인 항목 추가
- 오케스트레이터 템플릿에 Phase 0 (컨텍스트 확인) 추가 — 에이전트 팀/서브 에이전트 모드 모두 적용
- 오케스트레이터 description 템플릿에 후속 작업 키워드 패턴 포함

### Changed

- 핵심 원칙 2개 → 4개로 확장 (CLAUDE.md 등록, 진화 시스템 추가)
- **"진화 로그" → "변경 이력" 통일** — 이름과 스키마(4컬럼: 날짜/변경내용/대상/사유)를 전 섹션에서 일원화
- **Phase 1 Step 3** — Phase 0 감사 결과를 기반으로 충돌 분석하도록 변경 (중복 제거)
- **5-4 CLAUDE.md 템플릿 코드 블록** — 중첩 렌더링 깨짐 수정 (3백틱→4백틱)
- **역할 분담표 확장** — 스킬 목록, 디렉토리 구조, 변경 이력 행 추가
- **오케스트레이터 템플릿** — Phase 0 컨텍스트 확인 단계, 후속 작업 키워드 가이드 추가

## [1.0.1] - 2026-03-28

### Changed

- SKILL.md ↔ references 간 중복 내용 제거 (330줄 → 285줄)
  - Phase 2-1: 실행 모드 비교표/불릿 → 핵심 원칙 + agent-design-patterns.md 포인터
  - Phase 2-3: 에이전트 분리 기준 불릿 → 4축 요약 + agent-design-patterns.md 포인터
  - Phase 3: 에이전트 정의 템플릿 코드블록 → 필수 섹션 나열 + references 포인터
  - Phase 5-2: 에러 핸들링 5행 테이블 → 핵심 원칙 + orchestrator-template.md 포인터

## [1.0.0] - 2026-03-27

### Added

- 6 Phase 워크플로우 기반 하네스 구성 메타 스킬
- 6가지 에이전트 아키텍처 패턴 (파이프라인, 팬아웃/팬인, 전문가 풀, 생성-검증, 감독자, 계층적 위임)
- 에이전트 팀 / 서브 에이전트 실행 모드 지원
- Progressive Disclosure 기반 스킬 생성 가이드
- 오케스트레이터 템플릿 (에이전트 팀 모드 + 서브 에이전트 모드)
- QA 에이전트 통합 가이드 (실제 프로젝트 7개 버그 사례 기반)
- 스킬 테스트/평가 방법론 (With-skill vs Without-skill 비교)
- 실전 팀 구성 예시 5종 (리서치, 소설, 웹툰, 코드리뷰, 마이그레이션)
