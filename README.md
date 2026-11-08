# Laundered Consensus: companion site (draft)

A static companion site for the Swarm Alignment Sprint report *Laundered Consensus: Do AI Watchdogs Check the Approvals Other Agents Claim?* (Coetzee, Sinha, Vijay, Apart Research, November 2026).

**Status: draft, not public.** It goes live only when all three authors agree, and not before judging ends (the Swarm onboarding material says submissions stay hidden until then because of infohazard risk). `DRAFT` in `src/lib/content.ts` is `true`; while it is, the site shows a banner and asks search engines not to index it, and `npm run check:release` fails.

## Prior work

- Every file in this folder was written on 8 November 2026, after the sprint start (12:00 UTC, 6 November). Nothing here is preexisting sprint code.
- **Template:** the structure (Next.js static export, page layout, stylesheet, `scripts/safety-check.mjs`) is adapted from the team's Quiet Suppression companion site, built 25 October 2026 for the AI Collusion Research Sprint. That site is prior work (`†` in the report's Appendix B). No Quiet Suppression text, numbers, logos or video are reused; `npm run check` fails on leftover copy.

## What it shows

Home (abstract, three headline results, setup, video, one chart), Results (the report's Tables 1 to 4 and 8), Findings (what we found and what to do about it, limits, what stays out), Team. Every number and sentence is in `src/lib/content.ts`, copied from the final report PDF, with the table or section named in a comment.

## What stays out

Tactics are described by category only (report Appendix A). The site must never contain: the attacker's winning handoffs, the planted lines, forged notes, chain or swarm transcripts, attack-shaped test rows, held-out or outside-test answer keys, raw model outputs, internal mechanism ids, or a link to the private repository. Only the report's own figures are used (`public/figures/`); the two cartoon illustrations carry no text.

## Run

```bash
npm install
npm run build                 # static export to out/
npm run check                 # safety scan of source and out/
node scripts/safety-check.mjs --denylist /path/outside/this/folder/denylist.txt
python -m http.server 4173 -d out    # preview at http://localhost:4173
```

`npm run check:release` is the gate before any public deploy: it also fails while `DRAFT` is `true`.

## Hosting and workflow

- **Now:** the site is deployed to the Vercel project `laundered-consensus` (team `dsinha`) by the Vercel CLI, with Vercel Authentication on for All Deployments. Review access is one Shareable Link. This GitHub repo is private and is **not** connected to Vercel, so a push does not change what the team is reviewing.
- **After the three authors agree:** connect this repo to the Vercel project (Project Settings, Git), then make further changes here and let Vercel deploy from `main`. Keep the repo private until the same agreement covers making anything public.
- Do not commit `.env.local` or `.vercel/` (both are in `.gitignore`).

## Before it goes public

1. Liezl and Prashanth have both said yes, and judging has ended (or Apart has said public is fine).
2. Every number re-checked against the final PDF; credit and AI-use line for the video confirmed with its maker.
3. The video watched in full for any frame showing attack text; the slides checked the same way.
4. `DRAFT = false`, `npm run build`, `npm run check:release` exits 0, then deploy as a new Vercel project.
