---
name: commit-message
description: "Git 커밋 메시지를 Conventional Commits 형식으로 작성한다. 변경 내용을 한 줄 커밋 메시지로 요청하면 이 스킬을 사용할 것."
---

# Commit Message

커밋 메시지는 **Conventional Commits** 형식을 따른다: `type(scope): subject`

## 규칙
- **type** (필수): `feat`, `fix`, `docs`, `refactor`, `test`, `chore` 중 하나
- **scope** (선택): 영향 범위를 소괄호로 — 예: `(auth)`, `(login)`
- **subject** (필수): 명령형 현재시제, 50자 이내, **마침표로 끝내지 않는다**

## 예시
- 입력: JWT 토큰 기반 사용자 인증 추가 → `feat(auth): add JWT token validation`
- 입력: 로그인 비밀번호 표시 버튼 버그 수정 → `fix(login): correct password visibility toggle`
