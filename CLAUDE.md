# GhostBuild — Working Instructions

This repo is the GhostBuild workspace. The full playbook lives in [skill.md](skill.md). The animation library lives in [animations.md](animations.md). Post-build feedback questions live in [post-build-review.md](post-build-review.md). Read those before working on any client.

---

## Before You Do Anything Else In A New Session

The team works on a Pro plan with limited tokens. A session can end mid-build and the next person continues hours later. To make that handoff safe, every active client folder has a `progress.md` file.

**Your very first action in any new session is to run this check:**

```bash
ls clients/*/progress.md 2>/dev/null
```

For each `progress.md` you find, read it. If the `Status` field is anything other than `done` or `deleted`, surface it to the user:

> "I see an in-progress build for **[slug]** at `Status: [status]`. Last action: [next-action from the file]. Do you want to resume this, or work on something else?"

Wait for the user's answer before starting. Do not start a new client build without checking this first.

---

## Updating progress.md (Critical)

Every client folder must have a `progress.md` from the moment the client URL is given. It is the single source of truth for what state a build is in.

**Update progress.md every time you:**
- Finish a phase from skill.md
- Get a confirmation from the team (colour, font, reference site)
- Pause to ask the team a question
- Hit a blocker
- Finish writing a component/file during the build phase
- Start writing a component/file (set "Currently writing")
- Finish the build

**Update it BEFORE you reply to the user with a question.** That way if the session dies right after your message, the next session can read the file and know exactly what was being asked.

**During the build phase, update it BEFORE you start writing each file** (set "Currently writing: [file]") and **AFTER you finish each file** (move it to "Files done", clear "Currently writing"). If a session resumes and "Currently writing" has a value, REWRITE that file from scratch — never trust a half-written component.

## Resuming on "continue"

If the user opens a new session and types something like `continue`, `resume`, `keep going`, or names a client by slug:

1. Read the relevant `progress.md` silently (no chatty re-introduction)
2. State in one sentence what you read: "Resuming **[slug]** — `Status: [x]`, next: [next action]."
3. Do the next action immediately. Do not ask the user to re-confirm decisions already in `progress.md` (colour, font, reference, etc.) — they are locked in.
4. If "Currently writing" had a value, mention it: "Last session was mid-write on [file] — rewriting that one from scratch." Then rewrite it.

**Format (keep it short — under 60 lines):**

```markdown
# Progress — [slug]

**Status:** [one of: setting-up, awaiting-colour, awaiting-font, awaiting-reference, building, review-pending, awaiting-deploy, done, deleted]
**Last updated:** [YYYY-MM-DD HH:MM]
**Client URL:** [original site URL]

## Confirmed
- Logo downloaded: yes / no
- Images downloaded: [count] in public/images/
- Logo colours: [hex list]
- Website colour direction: [confirmed colour or "pending"]
- Font: [confirmed font or "pending"]
- Reference sites: [URLs or "pending"]

## Awaiting from team
- [List each open question — empty if none]

## Next action
[One sentence: what the next session should do]

## Notes
- [Anything non-obvious: rejected approaches, special requests, what was tried and didn't work]
```

If the file is missing for an in-progress client, recreate it immediately from the folder state (look at what's been downloaded, what's been written) before continuing.

---

## When a Build Completes Or Is Deleted

- **Completed and pitched:** set `Status: done` and keep the file for reference.
- **Deleted by user:** set `Status: deleted` *before* removing the folder, so the commit history shows the final state. Then remove `clients/[slug]/`.

---

## Other Working Rules

- The git user is **oliandhue**. Commit prefix is `ghostbuild([slug]): [what]`.
- Never invent fields, slugs, or colours not present in the source. If something is missing, write it in `progress.md` under "Awaiting from team" and ask.
- Do not delete anything from `skill.md`, `templates/`, `.claude/`, or this `CLAUDE.md` unless the user explicitly asks.
- When in doubt about state, read `progress.md` first. Then ask. Never guess.
