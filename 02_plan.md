# 02 Plan: First-week guide

## Why we build it

New hires lose time in their first week because they don't know where to find things or who to ask, and they aren't sure they're allowed to ask (A lost half a day on a password, B got forty wiki results for "card"). Their buddy answers the same few questions three or four times a day, and each interruption costs about twenty minutes. Three of four answers were just a wiki link. Source: `01_problem.md`.

## Who uses it

- **New hires (main users):** open it on their phone or laptop as soon as they arrive, and again whenever they get stuck.
- **Buddies:** write the daily tasks and the answers in advance. They don't use the page day to day.

## What already exists

| What | Why it isn't enough |
|---|---|
| Company wiki | The answers are there, but new hires don't know what to search for ("card" gives 40 pages). |
| Chatbot | Answers come with no source, so B didn't trust them and asked a person anyway. |
| Buddy | Knows everything but gets interrupted 3–4 times a day with the same questions. |
| Friday guide email | Correct and sourced, but it arrives at the end of the week, after the time is already lost. |

## User stories

1. As a new hire, when I arrive I want to see **today's tasks**, so I know what to do without asking.
2. As a new hire, when I get stuck I want to find **who to ask about X** (e.g. the corporate card), so I go to the right person the first time.
3. As a new hire, I want to **mark tasks done**, so I can see my progress when I come back later.
4. As a buddy, I want to **write the tasks and answers once**, so I don't have to repeat them for every new hire.

## Scope

**Must (v1)**
1. **Today's tasks:** a checklist for each day of the first week. The "done" mark is saved only in that person's browser.
2. **Answers to "where / who" questions:** the repeated topics (password, corporate card, meeting rooms, leave). Each answer shows a wiki location and a contact role.
3. **One page, no login:** works on both phone and laptop. Content comes from a file the buddies write in advance.

**This round** (from `05_user_test.md`, in this order; all within Must)
1. **A second tap on "Done" must not clear the mark** (tester 3, the only failed task). Ignore a tap that comes right after the first, and make undoing look deliberate (e.g. "Done ✓ · tap to undo").
2. **Open on the right day** (tester 2). Build S1 "Pick start date" from `03_screen_flow.md`: pick the start date once, save it in the browser, and open on today's day. Make the selected day button easier to see.
3. **Search finds related words** (tester 4, also tester 1). Buddies fill in `keywords` for every answer (e.g. printing, print, copier for Printer), and the filter matches word stems so "printing" finds "printer". No AI or synonym service (see Not doing).
- Keep the "Can I ask this?" card as is (tester 5).

**Next**
- Buddies edit tasks and answers on screen
- Notifications (e.g. a reminder for today's tasks)

**Not doing**
- Login, accounts, or saving anything on a server
- Real names, contact details, or employee numbers
- Chatbot or AI-generated answers
- Replacing the wiki or the Friday guide email
- Answers to personal, one-person questions

## Success criteria

- **4 out of 5** first-time users find **today's tasks** and the **corporate card contact** within **30 seconds** each, with no explanation.
- How we test it: give 5 people who haven't seen the page the link on a phone or laptop, say nothing, and time from page open to the right answer.

## Rules

- **Roles only.** Use "your buddy", "HR", "IT Support", "Business Support", "your team lead". Never show names, contact details, or employee numbers.
- **Don't make anything up.** Every answer comes from the buddies' content and points to a wiki location. If there is no confirmed answer, show "needs checking" with a contact role.
- **Nothing leaves the browser.** "Done" marks stay in the person's browser only. No login, no server storage, no tracking.
- **Phone first.** Today's tasks are visible without scrolling or menus.
- **Short answers.** One line for the answer, then (Wiki: location, contact: role).

> **Open point:** without a login, the page can't know which day "today" is. Assumption for v1: the new hire picks their start date once, and it is saved in their browser.
