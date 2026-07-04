# PROJECT KNOWLEDGE BASE

**Generated:** 2026-07-04 18:15:48 KST
**Commit:** 83a5fc6
**Branch:** main

## OVERVIEW

초등학생이 QR로 접속해 자기 번호를 누르고, 교사가 준비한 개인별 이미지 자료를 저장하게 하는 정적 Vite/React/TypeScript 앱이다. 로그인, DB, 외부 API 없이 `public/students` 정적 파일만으로 동작한다.

## STRUCTURE

```text
classroom-storage/
├── src/                  # SPA 라우팅, 학생 번호 검증, 화면 렌더링
├── public/students/      # 학생 번호별 items.json + 이미지 파일
├── DESIGN.md             # UI 토큰, 컴포넌트, 반응형 기준
├── README.md             # 실행, 자료 추가, 파일명 규칙
├── vercel.json           # /student/:number deep link rewrite
└── dist/                 # 빌드 산출물, 직접 수정 금지
```

`.omo/**`는 작업 메모/증거, `.qa/**`는 QA 산출물, `dist/**`는 생성물이다. 프로젝트 규칙을 찾을 때는 `src`, `public`, `README.md`, `DESIGN.md`, 설정 파일을 우선한다.

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| 앱 진입점 | `index.html`, `src/main.tsx` | `#root`에 `App` 렌더링 |
| 라우팅 | `src/App.tsx`, `src/domain.ts` | `/`, `/student/:number`, invalid 분기 |
| 학생 번호 규칙 | `src/domain.ts` | `0~23`, 폴더명은 두 자리 문자열 |
| 학생 자료 추가 | `public/students/NN/items.json` | 같은 폴더의 이미지 파일명만 참조 |
| 학생 화면 UI | `src/screens.tsx` | 카드, 저장 시트, 빈 상태 |
| 스타일 수정 | `src/styles.css`, `DESIGN.md` | 토큰과 컴포넌트 규칙 우선 |
| 배포 deep link | `vercel.json` | `/student/:number`를 `index.html`로 rewrite |
| QA 근거 | `.qa/**`, `.omo/**/evidence/**` | 증거로만 참고, 규칙으로 고정하지 않음 |

## CODE MAP

| Symbol | Type | Location | Refs | Role |
|--------|------|----------|------|------|
| `App` | component | `src/App.tsx:30` | entry | route state에 따라 화면 선택 |
| `useRouteState` | hook | `src/App.tsx:6` | `App` | `window.location`/history 상태 동기화 |
| `parseRoute` | function | `src/domain.ts:39` | 2 | URL pathname을 `RouteState`로 변환 |
| `toStudentNumber` | function | `src/domain.ts:27` | 2 | `0~23` 범위의 branded number 생성 |
| `formatStudentFolder` | function | `src/domain.ts:35` | 2 | `7` → `07` 같은 공개 폴더명 생성 |
| `loadStudentItems` | function | `src/domain.ts:59` | 2 | `/students/NN/items.json` fetch + 필터링 |
| `HomePage` | component | `src/screens.tsx:12` | 1 | 학생 번호 버튼 그리드 |
| `StudentPage` | component | `src/screens.tsx:48` | 1 | 자료 로딩과 학생 화면 shell |
| `MaterialList` | component | `src/screens.tsx:104` | 1 | loading/empty/ready 상태 분기 |
| `MaterialCard` | component | `src/screens.tsx:126` | internal | 이미지 카드와 저장 버튼 |
| `SaveSheet` | component | `src/screens.tsx:168` | internal | 길게 눌러 저장하는 full-screen dialog |

LSP TypeScript 서버는 현재 설치되지 않았다. 코드맵은 codegraph와 실제 파일 확인 기준이다.

## CONVENTIONS

- 기본 답변과 문서 추가는 한국어를 우선한다. 코드, 명령어, API 이름은 원문 유지.
- TypeScript는 strict 설정이다. `npm run build`가 `tsc --noEmit -p tsconfig.json`을 먼저 실행한다.
- 도메인 상태는 `StudentNumber` branded type, `RouteState`/`LoadState` discriminated union, `assertNever` exhaustiveness 패턴을 유지한다.
- `src/domain.ts`의 학생 범위는 `FIRST_STUDENT_NUMBER = 0`, `STUDENT_COUNT = 23`이다. 새 번호를 열려면 코드 상수와 `public/students/NN` 구조를 함께 맞춘다.
- 학생 자료는 `public/students/NN/items.json` 배열에 `{ "title": "...", "file": "..." }` 형태로 추가한다.
- 이미지 확장자는 앱 기준 `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`를 허용한다. README는 권장 형식으로 `png`, `jpg`, `jpeg`, `webp`를 우선한다.
- 파일명은 영어 소문자, 숫자, 하이픈을 권장한다. 한글, 띄어쓰기, 괄호가 있는 파일명은 피한다.
- 이모티콘용 PNG는 기존 `00`번처럼 `240 x 240`, RGBA, 투명 배경, 작은 파일 크기를 기준으로 맞춘다.
- UI 변경은 `DESIGN.md`의 색상 토큰, 4px spacing, 920px max width, 48px 이상 touch target, `prefers-reduced-motion` 대응을 따른다.
- `/student/:number`와 `/student/:number/` rewrite는 Vercel 배포에서 직접 링크/새로고침을 살리는 설정이므로 유지한다.

## ANTI-PATTERNS

- `dist/**`를 직접 수정하지 않는다. 필요한 변경은 소스나 `public`에서 하고 다시 빌드한다.
- `public/students/NN/items.json`에 없는 이미지 파일은 학생 화면에 나타나지 않는다.
- `items.json`의 `file`이 같은 폴더에 실제로 없으면 카드 이미지가 실패 상태가 된다.
- `.omo/**`와 `.qa/**`의 과거 작업 흔적을 현재 코드 규칙처럼 일반화하지 않는다.
- 새 색상이나 UI 패턴을 `DESIGN.md`와 `src/styles.css` 토큰 밖에서 즉흥적으로 만들지 않는다.

## COMMANDS

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build`가 현재 유일한 자동 검증 명령이다. 별도 `vitest`, `jest`, `playwright`, GitHub Actions 설정은 없다.

## QA NOTES

- 코드 변경 후 최소 `npm run build`를 실행한다.
- UI/라우팅 변경은 브라우저에서 `/`, `/student/0`, `/student/23`, 잘못된 번호 경로를 확인한다.
- 학생 자료 변경은 `items.json` 파싱, 파일 존재, 공개 URL 응답, 이미지 표시를 함께 확인한다.
- 이모티콘 이미지 변경은 PNG 해상도, RGBA 투명도, 파일 크기를 `public/students/00` 기준과 비교한다.
- 빈 배열인 학생 폴더가 많다. 빈 상태 문구 `자료 준비 중` 회귀도 대표 번호로 확인한다.
