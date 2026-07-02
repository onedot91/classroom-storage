## Bootstrap
- Skills: ulw-loop(사용자 ulw 요청), frontend(UI/UX 변경), programming(TypeScript/React), visual-qa(렌더 화면 검증)
- Tier: LIGHT - 기존 React 화면의 문구/배치 축소, 새 계층/인증/DB/외부 연동 없음.
- Criteria C1: 모바일 홈에서 번호 선택 전 불필요한 보조 안내가 사라지고 번호 버튼이 첫 화면 행동 중심으로 보인다. Scenario: Playwright Chromium 375x812 http://127.0.0.1:5173/ screenshot + text absence.
- Criteria C2: 학생 화면에서 장문 안내/3단계/기기별 설명이 사라지고 이미지 카드 중심 행동이 보인다. Scenario: Playwright Chromium 375x812 /student/1 screenshot + removed text absence + image/link presence.
- Failing-first proof: before edit, current DOM still contains bottom guide, subtitle, 3 steps, device-guide text.
ULW_LOOP_CLI=/Users/ibyeonghyeon/.codex/plugins/cache/sisyphuslabs/omo/4.14.1/components/ulw-loop/dist/cli.js
