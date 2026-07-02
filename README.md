# 우리 반 저장함

초등학생이 QR코드로 접속해 자기 번호를 누르고, 교사가 준비한 개인별 이미지 자료를 사진첩/갤러리에 저장할 수 있는 정적 웹사이트입니다.

## 실행

```bash
npm install
npm run dev
```

배포 빌드는 다음 명령으로 확인합니다.

```bash
npm run build
```

## 사용 흐름

1. 교사는 첫 화면 URL로 QR코드를 만듭니다.
2. 학생은 QR로 접속한 뒤 자기 번호를 누릅니다.
3. 자기 자료 화면에서 저장할 이미지를 꾹 누릅니다.
4. 아이폰은 `사진에 저장`, 안드로이드는 `이미지 저장` 또는 `이미지 다운로드`를 누릅니다.
5. 사진첩/갤러리에서 이미지를 확인합니다.

학생별 직접 링크도 열 수 있습니다.

- `/student/0`
- `/student/00`
- `/student/7`
- `/student/07`

## 자료 추가 방식

로그인, 데이터베이스, 외부 API 없이 `public/students/학생번호` 폴더에 정적 파일을 넣습니다. 학생 번호 폴더는 두 자리 숫자입니다.

```text
public/
  students/
    00/
      items.json
      like.png
      thanks.png
      done.png
    01/
      items.json
      happy.png
      newspaper.png
    02/
      items.json
      drawing.png
    03/
      items.json
```

`items.json`은 같은 폴더에 있는 이미지 파일명을 적습니다.

```json
[
  {
    "title": "기쁨 이모티콘",
    "file": "happy.png"
  },
  {
    "title": "내 신문 이미지",
    "file": "newspaper.png"
  },
  {
    "title": "상장 이미지",
    "file": "award.png"
  }
]
```

지원 권장 이미지 형식은 `png`, `jpg`, `jpeg`, `webp`입니다. 샘플 확인용으로 `svg`도 표시됩니다.

## 파일명 규칙

좋은 파일명:

- `happy.png`
- `newspaper-01.png`
- `award.png`
- `drawing.png`
- `character-happy.png`

피해야 할 파일명:

- `7번 기쁨 이모티콘 최종.png`
- `상장(수정본).png`
- `내 신문 이미지.png`
- 파일 이름에 띄어쓰기 있는 경우

규칙:

- 영어 소문자, 숫자, 하이픈을 권장합니다.
- 한글 파일명, 띄어쓰기, 괄호는 피합니다.
- 이미지 파일은 브라우저에서 직접 열 수 있는 공개 경로에 있어야 합니다.

## Vercel 배포

`vercel.json`에 `/student/:number` 새로고침을 `index.html`로 보내는 rewrite가 포함되어 있습니다. 따라서 학생별 URL을 직접 열거나 새로고침해도 React 앱이 번호 화면을 다시 렌더링합니다.
