# First-week guide

A one-page, no-login web page that shows new hires today's tasks and who to ask about common questions.

## Read first
1. `02_plan.md` — why, scope (Must / Next / Not doing), rules
2. `03_screen_flow.md` — screens S1–S6 and the data tables
3. `DESIGN.md` — colors, text sizes, layout (based on `mockup_B.html`)

## app/ layout
```
app/
  index.html   the single page; all screens (S1–S6) are views inside it
  style.css    styles; color tokens exactly as in DESIGN.md
  app.js       view switching, day calculation, done marks in localStorage
  content.js   Tasks and Answers tables, written by buddies (plain JS data, not fetched)
```

## Rules
- **Static files only.** HTML, CSS, JS. No server, build step, login, tracking, or network calls.
  Must work when `app/index.html` is opened directly from disk.
- **No real names.** Roles only: your buddy, HR, IT Support, Business Support, your team lead.
  No names, contact details, or employee numbers anywhere, including sample data.
- **Only "must" features.** Build only Must (v1) from `02_plan.md`. Ask before adding anything from Next.
- **Don't make up answers.** Unconfirmed answers show "Needs checking" + contact role only.
- **Check at 390px.** Every change is checked at 390 px wide: day header, checklist and
  "Who do I ask?" fit on one screen with no scrolling.
