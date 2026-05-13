# GhostBuild — Working Instructions

This repo is the GhostBuild workspace. The full playbook lives in [skill.md](skill.md). The animation library lives in [animations.md](animations.md). Post-build feedback questions live in [post-build-review.md](post-build-review.md). Read those before working on any client.

---

## Session Kickoff — Greeting + Per-Person Branch

**Trigger:** the first user message of a new session is a conversational greeting with no client context — anything in this rough family: `hey`, `hi`, `hello`, `yo`, `morning`, `what's up`, `whatsup`, `wassup`, `let's start`, `let's go`, `let's build`, `start a new build`, or a bare name like `it's Sara`.

If that is the first message, **before doing anything else**, ask exactly two things in one short message:

> "Welcome 👋 Two quick things before we start:
> 1. What's your name? (so I work on your branch)
> 2. What's the client website URL?"

Wait for both answers. Once you have them:

1. **Sanitize the name into a branch handle.** Lowercase, replace spaces and punctuation with hyphens, drop emojis. `Sara K.` → `sara-k`. `Hue` → `hue`.
2. **Check for an existing branch with that handle:**
   ```bash
   git branch --list <handle>
   ```
   - If it exists: switch to it (`git checkout <handle>`). If the branch is already checked out in another worktree (`git worktree list` shows it), use the suffixed form `<handle>-<short-slug>` instead and tell the user.
   - If it doesn't exist: `git checkout -b <handle>` from the current branch.
3. **Tell the user one line:** `"You're on branch \`<handle>\` — let's go."`
4. Now run the standard "Before You Do Anything Else" check below (read every `clients/*/progress.md`) BEFORE starting Phase 1 with the URL they gave.

**Skip this kickoff entirely when:**
- The first message includes a client URL directly (just start Phase 1).
- The first message is `continue`, `resume`, names a client slug, or otherwise points at in-progress work (just run the existing `progress.md` resume flow).
- The user explicitly says they don't need a branch (rare — but respect it).

**Why this exists:** the team is multi-person on Claude Pro. Without per-person branches, two teammates working in parallel collide on the same files. Branching per person at session start makes it safe to work in parallel and makes commit attribution match the actual human.

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

**Status:** [one of: setting-up, awaiting-colour, awaiting-font, awaiting-reference, awaiting-mockup-approval, mockup-approved, building, review-pending, awaiting-deploy, done, deleted]
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
