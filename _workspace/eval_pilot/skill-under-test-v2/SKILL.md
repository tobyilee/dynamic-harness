---
name: commit-message-ticketed
description: "Git 커밋 메시지를 [ABC-번호] 티켓 프리픽스 + Conventional Commits 형식으로 작성한다. 변경 내용을 한 줄 커밋 메시지로 요청하면 이 스킬을 사용할 것."
---

# Commit Message (Ticketed)

모든 커밋 메시지는 반드시 **티켓 프리픽스로 시작**한다: `[ABC-<번호>] type(scope): subject`

## 규칙
- **티켓 프리픽스 (필수)**: `[ABC-<번호>]` 형태. 티켓 번호를 모르면 `[ABC-000]`을 쓴다. **절대 생략하지 않는다.**
- **type** (필수): `feat`, `fix`, `docs`, `refactor`, `test`, `chore` 중 하나
- **subject**: 명령형 현재시제, 50자 이내, 마침표로 끝내지 않는다

## 예시
- 입력: JWT 토큰 기반 사용자 인증 추가 → `[ABC-000] feat(auth): add JWT token validation`
- 입력: 로그인 비밀번호 표시 버튼 버그 수정 → `[ABC-000] fix(login): correct password visibility toggle`
