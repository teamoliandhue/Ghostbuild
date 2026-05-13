# GhostBuild Post-Build Review

This file defines the questions asked after every completed website build. The answers are used to update skill.md, animations.md, and the templates. The goal is that every build makes the next one better.

---

## When to Run This

Immediately after the team has seen the finished build and given a first reaction. Run it before the client is contacted. Honest feedback at this moment is more useful than feedback after the pitch.

---

## The Questions

These are the questions asked after every build. Claude asks them as a structured conversation, waits for each answer, then updates the relevant files.

### Design Quality
1. On a scale of 1 to 10, how close did the final site feel to the reference website we were given?
2. What specific part of the design looked the most off compared to the reference?
3. What part looked the best?

### Animation
4. Did the Three.js animation add to the site or distract from it?
5. Was the animation speed right (too fast, too slow, just right)?
6. Would a different animation from the library have worked better? Which one?

### Content
7. Did the copy feel human or did anything read like AI output?
8. Was there any section where the content felt weak or unconvincing?
9. Was there a line or headline that you thought was particularly strong?

### Process
10. Was there anything I asked for in the process that felt unnecessary or slowed things down?
11. Was there anything I should have asked for that I did not?
12. Did the images we downloaded from the client's site work well in the build?

### What to Change
13. If we built this site again from scratch, what is the single biggest thing we would do differently?
14. Is there an animation, layout pattern, or content approach we should add to the skill or animation library?

---

## What Happens With the Answers

After collecting answers:

- Design feedback goes into skill.md under a new "Build Learnings" section
- Animation feedback updates the team rating field in animations.md for the animation used
- Any new animation or pattern gets added to animations.md
- Process feedback updates the workflow steps in skill.md
- Strong content lines or approaches get noted in skill.md under Content Standards
- Everything is committed: `ghostbuild(review): post-build learnings from [slug]`

---

## Running the Review

Claude asks the questions in groups of 3 to 4 at a time, not all 14 at once. After each group, it applies what it learned before asking the next. At the end it summarises what changed and what was added to the skill files.

---

*This process only works if the feedback is honest. A 6 is more useful than a 10 that is not true.*
