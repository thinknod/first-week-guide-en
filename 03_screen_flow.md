# 03 Screen flow: First-week guide

Based on `02_plan.md` (Must v1 only). It is one page with no login, so each "screen" below is a view inside that page, not a separate URL.

## Screen map

```
First visit                     Every later visit
    │                                  │
    ▼                                  │
[S1 Pick start date] ─────────────────►│
                                       ▼
                               [S2 Today]  ◄──────────────┐
                               │   │    │                 │
               pick another day│   │    │"Who do I ask?"  │
                               ▼   │    ▼                 │
                    [S3 Week view] │  [S4 Ask list] ──► [S5 Answer]
                                   │
                         ⚙ settings▼
                         [S6 Settings] ──► S1 (change date)
```

Every screen has a "Today" button that goes back to S2.

## Screens

### S1. Pick start date

| | |
|---|---|
| **How you get there** | You open the link for the first time (no start date in this browser yet). Or you tap "Change start date" in S6. |
| **What you do** | Pick your first day from a date picker (default: today). One line explains: "Saved only in this browser. No login." Tap **Start**. |
| **Where you go next** | S2 Today. |

### S2. Today (home)

| | |
|---|---|
| **How you get there** | Every visit after the start date is saved. The "Today" button on any screen. |
| **What you do** | See the header "Day 2 of 5 · Tuesday" and today's checklist. Tick tasks done (saved in this browser). See progress "2 of 4 done". The **Who do I ask?** button is always visible. |
| **Where you go next** | S4 Ask list (Who do I ask?). S3 Week view (tap the day header or "Other days"). S5 Answer (when a task links to an answer, e.g. "Change your groupware password →"). S6 Settings (⚙). |

Rules for this screen:
- **Phone first:** the day header, the checklist, and the "Who do I ask?" button fit on one phone screen with no scrolling or menu.
- **Which day is "today":** count working days (Mon–Fri) from the start date. Day 1 = start date.
  - Before the start date: show Day 1 with the note "Starts on Mon, Nov 17".
  - After Day 5: show "Your first week is done" and the progress for all 5 days. The Ask list still works.

### S3. Week view

| | |
|---|---|
| **How you get there** | From S2, tap the day header or "Other days". |
| **What you do** | See Day 1 to Day 5 with progress for each ("Day 1 · 4 of 4 done"). Open a day to see and tick its tasks (e.g. something left from yesterday). |
| **Where you go next** | Back to S2 Today. S5 Answer from a linked task. |

### S4. Ask list ("Who do I ask?")

| | |
|---|---|
| **How you get there** | The "Who do I ask?" button on S2 or S3. |
| **What you do** | See the repeated topics as a short list (Password, Corporate card, Meeting rooms, Leave, …). Type in a search box to filter by topic or keyword ("card" shows only Corporate card, not 40 pages). |
| **Where you go next** | Tap a topic → S5 Answer. Nothing matches → the empty state shows: "Not here yet. Ask your buddy — this is a normal first-week question." Back → S2. |

### S5. Answer

| | |
|---|---|
| **How you get there** | Tap a topic in S4, or a linked task in S2/S3. |
| **What you do** | Read one line of answer, then **Wiki:** location and **Contact:** role. If the answer is not confirmed, the screen shows a "Needs checking" label and only the contact role. |
| **Where you go next** | Back to S4 Ask list, or "Today" → S2. (The wiki location is text the person can open in the wiki themselves; the page sends nothing anywhere.) |

Example on screen:

> **Corporate card**
> Apply with the corporate card form; approval takes a few days.
> Wiki: Finance > Corporate card > How to apply · Contact: Business Support

### S6. Settings

| | |
|---|---|
| **How you get there** | ⚙ on S2. |
| **What you do** | See the saved start date. **Change start date** (→ S1). **Clear my data** (removes start date and done marks from this browser, after a confirm). One line: "Nothing here leaves your browser." |
| **Where you go next** | S1 (change date or after clearing data). Back → S2. |

### Not a screen in v1

- **Buddy editing:** buddies write `content` (the Tasks and Answers tables below) in a file before the new hire starts. On-screen editing is in "Next".
- **Login, notifications, chatbot:** out of scope (see `02_plan.md`).

## Data tables

Two tables are written by buddies in the content file. Two are saved only in the new hire's browser. No table holds names, contact details, or employee numbers.

> The example rows show the format. The wiki locations and answer text are placeholders until a buddy fills them in from the real wiki.

### 1. Tasks (content file, written by buddies)

| Column | Meaning |
|---|---|
| `task_id` | Unique ID |
| `day` | 1–5 (day of the first week) |
| `order` | Position in that day's list |
| `title` | What to do, one line |
| `answer_id` | Optional link to an Answer (S5) |

| task_id | day | order | title | answer_id |
|---|---|---|---|---|
| d1-01 | 1 | 1 | Collect your laptop and log in | |
| d1-02 | 1 | 2 | Change your groupware password | password |
| d1-03 | 1 | 3 | Meet your buddy and team lead | |
| d2-01 | 2 | 1 | Apply for the corporate card | corporate-card |
| d2-02 | 2 | 2 | Book a meeting room for your 1:1 with your buddy | meeting-room |
| d3-01 | 3 | 1 | Read how to request leave | leave |
| d5-01 | 5 | 1 | Week review with your buddy | |

### 2. Answers (content file, written by buddies)

| Column | Meaning |
|---|---|
| `answer_id` | Unique ID |
| `topic` | Name shown in the Ask list |
| `keywords` | Extra search words |
| `answer` | One line |
| `wiki_location` | Where it lives in the wiki |
| `contact_role` | Role only: your buddy, HR, IT Support, Business Support, your team lead |
| `status` | `confirmed` or `needs_checking` |

| answer_id | topic | keywords | answer | wiki_location | contact_role | status |
|---|---|---|---|---|---|---|
| password | Groupware password | login, account, reset | Change it in the groupware account settings. | IT > Accounts > Groupware password | IT Support | confirmed |
| corporate-card | Corporate card | card, expenses | Apply with the corporate card form. | Finance > Corporate card > How to apply | Business Support | confirmed |
| meeting-room | Meeting rooms | room, booking, calendar | Book through the groupware calendar. | Office > Meeting rooms | Business Support | confirmed |
| leave | Leave | holiday, vacation, day off | Request leave in the HR system; your team lead approves. | HR > Leave > How to request | HR | confirmed |
| parking | Parking | car, garage | | | Business Support | needs_checking |

A `needs_checking` row shows only the "Needs checking" label and the contact role, never a guessed answer.

### 3. Settings (browser only)

| Key | Example value | Set on |
|---|---|---|
| `start_date` | 2026-11-17 | S1 |

### 4. Done marks (browser only)

| task_id | done | done_at |
|---|---|---|
| d1-01 | true | 2026-11-17 10:12 |
| d1-02 | true | 2026-11-17 11:40 |
| d1-03 | false | |

Cleared by "Clear my data" in S6. Never sent to a server.

## Check against the success criteria

| Test task (30 s, no explanation) | Path |
|---|---|
| Find today's tasks | Open link → S2 (one tap more on the very first visit: S1 → Start) |
| Find the corporate card contact | S2 → **Who do I ask?** → Corporate card → S5 shows "Contact: Business Support" |
