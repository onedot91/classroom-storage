# ULW Notepad: Kakao Emoticon Fit

- Tier: LIGHT
- Scope: optimize only public/students/05 PNG assets for message use.
- Skills: ulw-loop for evidence-led execution; imagegen considered for raster editing, skipped because deterministic PNG canvas/scale post-processing preserves the existing drawing better than generation.
- Success criteria:
  - RED->GREEN metric: existing 240x240 assets had 8px minimum safe margins and 201-224px visible content; updated assets are 320x320 RGBA PNGs with >=24px minimum safe margins and 244-272px visible content.
  - Real surface: /student/5 browser captures show all three student 05 images rendered without clipping.
- Evidence:
  - Before metrics: .omo/ulw-loop/kakao-emoticon/evidence/student05-before.json
  - After metrics: .omo/ulw-loop/kakao-emoticon/evidence/student05-after.json
  - After contact sheet: .omo/ulw-loop/kakao-emoticon/evidence/student05-after-contact.png
  - Browser captures: .omo/ulw-loop/kakao-emoticon/evidence/student05-page-390.png, .omo/ulw-loop/kakao-emoticon/evidence/student05-page-1280-tall.png
- Verification:
  - npm run build: pass
  - /student/5 and all three /students/05/*.png URLs: HTTP 200 via /usr/bin/curl
  - Cleanup: Vite dev server session 94146 stopped after QA; leftover node PID 74663 killed; lsof -i :5173 returned empty.

## 2026-07-05 512px Website Emoticon Pass

- Tier: LIGHT
- Scope: all 72 `public/students/*/*.png` files plus display sizing in `src/screens.tsx` and `src/styles.css`.
- RED evidence: `.omo/ulw-loop/kakao-emoticon/evidence/all-png-before-512.json` recorded 72/72 PNGs not matching the requested `512x512 / PNG / transparent background / 1:1` spec.
- GREEN evidence:
  - `.omo/ulw-loop/kakao-emoticon/evidence/all-png-after-512.json`: 72 PNGs are `512x512`, RGBA PNGs, with transparent pixels and transparent corners.
  - `.omo/ulw-loop/kakao-emoticon/evidence/all-png-contact-sheet-512.png`: full visual contact sheet.
  - `.omo/ulw-loop/kakao-emoticon/evidence/student05-page-512-390-transform-fixed.png`: mobile browser proof after fixing 512px display clipping.
  - `.omo/ulw-loop/kakao-emoticon/evidence/student00-page-512-1280-transform-fixed.png`: desktop browser proof.
- Verification:
  - `npm run build`: pass.
  - `items.json` references: 72 refs, 0 missing.
  - HTTP check: `/student/0`, `/student/5`, `/student/23`, and all 72 PNG URLs returned 200.

## 2026-07-05 Mobile UI Fix

- Issue: mobile Safari showed the 512px image preview/card layout overflowing horizontally after the 512px conversion.
- Fix: removed the temporary mobile `inline-size`/`transform` rules, made `.image-frame` a real `aspect-ratio: 1` preview well, and removed `width`/`height` attributes from material card images so CSS controls responsive sizing.
- Evidence:
  - Build: `npm run build` pass.
  - Mobile CDP emulation at 390 CSS px: `innerWidth=390`, `scrollWidth=390`, first card width `358`, image frame width `324`, actions width `324`.
  - Screenshot: `.omo/ulw-loop/kakao-emoticon/evidence/mobile-ui-fix-student05-390-emulated.png`.
  - Cleanup: Vite dev server and Chrome CDP process stopped; `lsof -i :5173` and `lsof -i :9223` returned empty.
