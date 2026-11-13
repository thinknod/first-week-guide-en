# DESIGN: First-week guide

Based on **mockup B (Cards)** (`mockup_B.html`). Phone first: designed at 390 px wide.
Screens and data are in `03_screen_flow.md`. This file covers only how things look.

## 1. Colors

Contrast is the WCAG 2.x ratio. Goal: **every text pair ≥ 4.5:1** (AA for normal text), even for large text.
Two colors from the mockup were below 4.5:1 and are changed (marked **Changed**).

| Token | Value | Was (mockup B) | Where used |
|---|---|---|---|
| `--ink` | `#1d1d1f` | same | Main text: "Today" title, task titles, Ask box heading, progress count |
| `--muted` | `#6e6e73` | same | Secondary text: day header, "Task 1" label, contact line, Ask box note, "1 task left", done task titles |
| `--accent` | `#2a64c8` | `#2f6fde` | **Changed.** Links ("Answer →", "Other days →"), chip text |
| `--accent-soft` | `#e8effc` | same | Chip background |
| `--done` | `#1e7e34` | `#34a853` | **Changed.** Ticked check button fill, progress ring fill |
| `--bg` | `#f2f2f7` | same | Page background, inside of the progress ring |
| `--surface` | `#ffffff` | same | Cards, Ask box, unticked check button |
| `--line` | `#e5e5ea` | same | Dividers inside cards, empty part of the progress ring |
| `--control` | `#8a8a8e` | new (was `--line`) | **New.** Border of the unticked check button (see non-text below) |

The grey `#d9d9de` behind the phone and the "Mockup B · 390 px" label exist only in the mockup. They are not part of the product.

### Text contrast (every text/background pair on screen)

| Text | Background | Where | Ratio | Result |
|---|---|---|---|---|
| `--ink` #1d1d1f | `--surface` #ffffff | Task titles, Ask box heading | **16.83:1** | Pass |
| `--ink` #1d1d1f | `--bg` #f2f2f7 | "Today" title, progress count "0/2" | **15.08:1** | Pass |
| `--muted` #6e6e73 | `--surface` #ffffff | "Task 1", contact line, Ask note, done task titles | **5.07:1** | Pass |
| `--muted` #6e6e73 | `--bg` #f2f2f7 | Day header, "1 task left from Day 1" | **4.54:1** | Pass (just). Do not lighten `--muted` or darken `--bg`. |
| `--accent` #2a64c8 | `--surface` #ffffff | "Answer →" | **5.59:1** | Pass |
| `--accent` #2a64c8 | `--bg` #f2f2f7 | "Other days →" | **5.01:1** | Pass |
| `--accent` #2a64c8 | `--accent-soft` #e8effc | Chip text | **4.84:1** | Pass |
| #ffffff | `--done` #1e7e34 | ✓ on a ticked check button | **5.14:1** | Pass |

What the changes fixed:

| Pair | Before | After |
|---|---|---|
| Accent on white (`Answer →`) | #2f6fde: 4.72:1 | #2a64c8: **5.59:1** |
| Accent on page bg (`Other days →`) | #2f6fde: **4.23:1 (fail)** | #2a64c8: **5.01:1** |
| Accent on chip | #2f6fde: **4.09:1 (fail)** | #2a64c8: **4.84:1** |
| White ✓ on done | #34a853: **3.06:1 (fail)** | #1e7e34: **5.14:1** |

### Non-text contrast (shapes, WCAG 1.4.11 needs ≥ 3:1)

| Shape | Against | Ratio | Result |
|---|---|---|---|
| Unticked check border, mockup `--line` #e5e5ea | `--surface` #ffffff | 1.26:1 | Fail: the button is nearly invisible. Use `--control`. |
| Unticked check border, `--control` #8a8a8e | `--surface` #ffffff | **3.44:1** | Pass |
| Ticked check fill `--done` #1e7e34 | `--surface` #ffffff | **5.14:1** | Pass |
| Progress ring fill `--done` #1e7e34 | `--bg` #f2f2f7 | **4.60:1** | Pass |
| Divider `--line` #e5e5ea | `--surface` #ffffff | 1.26:1 | OK: decoration only, carries no meaning |

## 2. Text sizes

Font: system stack `-apple-system, "Segoe UI", Roboto, sans-serif`. No web font.

| Style | Size | Weight | Line height | Color | Used for |
|---|---|---|---|---|---|
| Title | 26 px | 700 | 1.2 | `--ink` | "Today" |
| Card title | 18 px | 600 | 1.3 | `--ink` (`--muted` + line-through when done) | Task title |
| Section heading | 17 px | 700 | 1.3 | `--ink` | "Stuck? Who do I ask?" |
| Body | 14 px | 400 | 1.4 | `--muted` / `--accent` | Contact line, Ask note, chips, footer, links |
| Small | 13 px | 400 | 1.4 | `--muted` | Day header "Day 2 of 5 · Tuesday, Nov 18 · ⚙" |
| Count | 13 px | 600 | 1 | `--ink` | Progress ring "0/2" |
| Label | 12 px | 400, UPPERCASE, letter-spacing 0.04em | 1.3 | `--muted` | "Task 1" |

Rule: nothing smaller than 12 px. Text must still fit when the phone's text size is set to 200%: cards grow taller, nothing is cut off.

## 3. Spacing

Base unit: 4 px. Use only these values: **2, 8, 12, 16, 20, 24**.

| Where | Value |
|---|---|
| Page side padding (cards, Ask box) | 16 px |
| Header and footer side padding | 20 px |
| Header padding | 8 px top, 12 px bottom |
| Gap between cards | 12 px |
| Card padding | 16 px |
| Gap between task text and check button | 12 px |
| Card divider: space above and below | 12 px |
| Ask box top margin | 16 px |
| Gap between chips | 8 px |
| Chip padding | 8 px × 12 px |
| Footer top padding | 16 px |
| Page bottom padding | 24 px |
| Label → title (small gaps) | 2 px |

Radius: cards and Ask box **16 px**, chips **999 px** (pill), check button and ring **50%**.
Shadow: cards only, `0 1px 3px rgba(0,0,0,.06)`.

## 4. Components

### Header
- Left: day header (Small, `--muted`) above the title "Today".
- Right: progress ring, 52 × 52 px. Fill = `--done`, empty part = `--line`, 5 px thick, count in the middle ("done/total").
- ⚙ opens Settings (S6). Tapping the day header opens Week view (S3).

### Task card
- White card, Label "Task N" + Card title on the left, check button on the right.
- Optional bottom row (only when the task has `answer_id`): divider, then "Contact: *role*" on the left and "Answer →" (`--accent`) on the right. Opens S5.
- **Check button**, 36 × 36 px visible circle, with a **44 × 44 px** tap area.
  - Unticked: white fill, 2 px `--control` border, no icon shown.
  - Ticked: `--done` fill and border, white ✓.
  - Done card: title turns `--muted` with line-through. The ✓ stays, so "done" is not shown by color only.

### Ask box ("Stuck? Who do I ask?")
- White card under the task cards. Section heading + one line of Body note.
- Chips: one per common topic (Groupware password, Corporate card, Meeting rooms, Leave) + "More…" that opens S4. Each chip opens S5 for that topic.
- Chip: `--accent-soft` background, `--accent` text, pill shape. Tap area at least 44 px high (add invisible padding if needed).

### Footer
- Left: leftover note "1 task left from Day 1" (`--muted`). Hide it when nothing is left.
- Right: "Other days →" (`--accent`), opens S3.

## 5. Checks

Run these before calling a screen done.

**Contrast**
- [ ] Every text pair in the table above is ≥ 4.5:1. Any new color pair gets a row in the table with its ratio before use.
- [ ] Check button border and ring fill are ≥ 3:1 against what they sit on.
- [ ] No hard-coded colors in CSS; only the tokens in section 1.

**Layout (S2 Today at 390 × 844)**
- [ ] Day header, all of today's tasks (up to 4), and the "Who do I ask?" box fit on one screen with no scrolling.
- [ ] Also fits at 360 px wide with no sideways scroll.
- [ ] At 200% text size, nothing is cut off or overlaps.

**Touch and keyboard**
- [ ] Check buttons, chips, and links have a tap area of at least 44 × 44 px.
- [ ] Everything can be reached with Tab and used with Enter/Space; focus is visible (2 px `--accent` outline).

**Meaning not by color only**
- [ ] A done task shows ✓ **and** line-through, not just a color change.
- [ ] Check button has `aria-pressed="true|false"` and a label with the task name (e.g. "Mark 'Apply for the corporate card' done").
- [ ] Progress ring has text ("1/2") and an accessible label ("1 of 2 tasks done").

**Content**
- [ ] Contacts show a role only (e.g. "Business Support"), never a person's name.
- [ ] A `needs_checking` answer shows the "Needs checking" label and the contact role, no guessed answer.
