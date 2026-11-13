---
name: friday-mail
description: Write the weekly Friday guide email for new hires from that week's question file. Use when the user runs /friday-mail or asks for this week's new-hire guide email. Takes one argument, the question file name (e.g. questions_1031.md).
argument-hint: <questions_MMDD.md>
allowed-tools: Read, Glob, Grep, Write
---

# Friday guide email

This week's question file: `$ARGUMENTS`

## 0. Load the rules first

Read `work_context.md` in the project root before doing anything else. It is the source of truth for the role, steps, rules and examples. Everything below only says how to apply it each week. If anything here seems to disagree with `work_context.md`, follow `work_context.md`.

## 1. Find the inputs

- **Question file:** `my_work/$ARGUMENTS`. Accept the argument with or without the `my_work/` prefix or the `.md` extension. If no argument was given, or the file does not exist, stop and ask the user for the file name. Do not guess which week it is.
- **Week date:** take `MMDD` from the file name (`questions_1031.md` → Oct 31). This is the date for the subject line and the output file names.
- **Last week's email:** the `my_work/guide_mail_MMDD.md` with the latest date before this week's date. Use it as the template for shape and tone, and to spot questions that were already answered.
- **Wiki:** `my_work/wiki_list.md`. The only source for answers.

## 2. Do the steps from work_context.md

1. List every question from the file as received, with its date. Break up bundled messages into separate questions.
2. Leave out personal questions (one person's own situation or feelings). Write down the reason.
3. Group questions that ask the same thing into one topic.
4. For each topic, find the answer and contact in `wiki_list.md`. If there is no matching wiki row, the answer is `needs checking`. Never fill in an answer from general knowledge.
5. Write each email entry in two lines: the question, then the answer with `(Wiki: location, contact: role)`. Use roles, never names, and never say who asked.

## 3. Write two files

Do not overwrite an existing file without asking.

**`my_work/qa_MMDD.md`**: the working sheet for the coordinator, same layout as `my_work/qa.md`:
1. All questions this week (as received): #, date, question
2. Grouped questions and answers: topic, from #, question (email wording), answer, wiki, contact
3. Left out of the email: #, question, reason
4. Needs checking (for the coordinator): every `needs checking` question, plus notes on anything you assumed (for example, "For next week" items copied from last week, repeats of questions answered in earlier emails)

**`my_work/guide_mail_MMDD.md`**: the draft email, in exactly the shape of last week's email:
- `Subject: [First week] Questions from this week and what to prepare for next week (Mon DD)`
- The same greeting
- `1. Questions from this week`: one two-line entry per topic. `needs checking` entries stay in, with `needs checking` as line 2
- `2. For next week`: carry over the recurring items from last week's email. Add a reminder only if it comes from the wiki. Flag these in the qa sheet for the coordinator to confirm
- The same closing lines and sign-off

## 4. Check before you finish

- Every question from the file is either in the email, grouped into a topic, or listed under "Left out" with a reason.
- Every answer matches a row in `wiki_list.md`; everything else says `needs checking`.
- No names of new hires or buddies anywhere in the email.
- Each entry is two lines.

## 5. Report back

Tell the user, briefly:
- The two file paths written
- How many questions came in, how many topics went in the email, how many were left out
- The "needs checking" list, so the coordinator can follow up
