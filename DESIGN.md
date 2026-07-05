# 우리 반 저장함 Design System

## 1. Atmosphere & Identity

초등 저학년도 QR로 들어와 바로 이해할 수 있는 밝고 안정적인 교실 저장함이다. 서명은 큰 번호 버튼과 넉넉한 이미지 카드이며, 학생이 읽기보다 누르고 길게 눌러 저장하는 행동을 먼저 발견하게 한다.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | --surface-primary | #f7fbff | #111827 | Page background |
| Surface/secondary | --surface-secondary | #ffffff | #1f2937 | Cards and panels |
| Surface/soft | --surface-soft | #eef7ff | #243447 | Instruction areas |
| Surface/checker-light | --surface-checker-light | #ffffff | #1f2937 | Transparent image preview tiles |
| Surface/checker-dark | --surface-checker-dark | #e8f1fb | #334155 | Transparent image preview tiles |
| Text/primary | --text-primary | #182235 | #f9fafb | Headlines and body |
| Text/secondary | --text-secondary | #526174 | #cbd5e1 | Hints |
| Text/inverse | --text-inverse | #ffffff | #111827 | Accent buttons |
| Border/default | --border-default | #d8e6f3 | #334155 | Cards, dividers |
| Accent/primary | --accent-primary | #1769d2 | #60a5fa | Primary actions |
| Accent/hover | --accent-hover | #0f55ad | #93c5fd | Hover and active |
| Accent/warm | --accent-warm | #ffb84d | #fbbf24 | Friendly highlights |
| Accent/mint | --accent-mint | #38b898 | #5eead4 | Success hints |
| Status/error | --status-error | #c73850 | #fb7185 | Image load errors |
| Status/info | --status-info | #1769d2 | #60a5fa | Informational links |

### Rules

- Accent blue is for navigation, links, and primary actions.
- Warm and mint accents are supporting visual cues, not competing CTAs.
- New colors must be added here before use.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | 34px | 800 | 1.18 | 0 | Main instruction |
| H1 | 30px | 800 | 1.2 | 0 | Page title |
| H2 | 24px | 800 | 1.25 | 0 | Student page title |
| H3 | 19px | 700 | 1.35 | 0 | Card titles |
| Body/lg | 18px | 700 | 1.5 | 0 | Important guidance |
| Body | 16px | 500 | 1.6 | 0 | Default text |
| Body/sm | 14px | 500 | 1.5 | 0 | Secondary help |
| Caption | 13px | 700 | 1.4 | 0 | Card captions |

### Font Stack

- Primary: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace

### Rules

- Body text never goes below 13px.
- Korean text keeps letter spacing at 0 for readability.

## 4. Spacing & Layout

### Base Unit

All spacing derives from 4px.

| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Tight inline gap |
| --space-2 | 8px | Small gap |
| --space-3 | 12px | Button inner gap |
| --space-4 | 16px | Default padding |
| --space-5 | 20px | Comfortable padding |
| --space-6 | 24px | Card padding |
| --space-8 | 32px | Section gap |
| --space-10 | 40px | Major vertical gap |
| --space-12 | 48px | Page top/bottom |

### Grid

- Max content width: 920px
- Number grid: 3 columns on small mobile, 4 columns from 480px, 6 columns on desktop.
- Material cards: 1 column mobile, 2 columns from 860px when space allows.

### Rules

- Touch targets are at least 48px high.
- Main page padding is mobile-safe and respects `100dvh`.

## 5. Components

### Number Button
- **Structure**: `button` inside a grid.
- **Variants**: default.
- **Spacing**: `--space-3` to `--space-4`.
- **States**: default, hover, active, focus.
- **Accessibility**: visible label, keyboard focus ring, minimum 56px height.
- **Motion**: transform on active only.

### Action Button
- **Structure**: `button` or `a` with text label.
- **Variants**: primary, secondary, small.
- **Spacing**: `--space-3` to `--space-5`.
- **States**: default, hover, active, focus, disabled.
- **Accessibility**: clear text, no icon-only controls.
- **Motion**: transform on active only.

### Material Card
- **Structure**: title, image frame, material actions.
- **Variants**: normal, image-error, share-status.
- **Spacing**: `--space-4` to `--space-6`.
- **States**: default, image loading failure, share copied, share failed.
- **Accessibility**: image has alt text; save opens the long-press sheet and share uses native file sharing when available with link share or clipboard fallback.
- **Motion**: card uses static depth; image long-press is never blocked.

### Material Actions
- **Structure**: two equal-width `button` controls in one row.
- **Variants**: save primary, share secondary.
- **Spacing**: `--space-3` gap.
- **States**: default, hover, active, focus, share feedback.
- **Accessibility**: clear text labels, 48px minimum touch targets, status text announced with `role="status"`.
- **Motion**: transform on active only.

### Image Frame
- **Structure**: bordered preview well inside a material card.
- **Variants**: checker background for transparent PNG/SVG previews, image-error.
- **Spacing**: fixed minimum height with centered image.
- **Accessibility**: decorative checker pattern must stay subtle and never reduce image legibility.
- **Motion**: none.

### Save Sheet
- **Structure**: full-screen overlay with one large image, one short instruction, and close action.
- **Variants**: default.
- **Spacing**: `--space-4` to `--space-6`.
- **States**: open, closed.
- **Accessibility**: opened by the save button, uses `role="dialog"`, and keeps the image available for native long-press saving.
- **Motion**: none.

### Empty State
- **Structure**: simple panel with one sentence and return action.
- **Variants**: missing items, invalid student number.
- **Spacing**: `--space-6`.
- **States**: default.
- **Accessibility**: text is plain and direct.
- **Motion**: none.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 120ms | ease-out | Button press |
| Standard | 200ms | ease-in-out | Hover and focus |

Rules:
- Only `transform`, `opacity`, and `box-shadow` change on interaction.
- Respect `prefers-reduced-motion`.

## 7. Depth & Surface

### Strategy

Mixed: soft borders plus blue-tinted shadows.

| Level | Value | Usage |
|-------|-------|-------|
| Subtle | 0 1px 2px rgb(24 34 53 / 0.06) | Buttons |
| Default | 0 12px 34px rgb(23 105 210 / 0.12) | Cards |
| Prominent | 0 18px 48px rgb(23 105 210 / 0.16) | Main panels |

Rules:
- Cards use 18px radius; buttons use 16px radius or full pill.
- Shadows stay soft and tinted, never harsh black.
