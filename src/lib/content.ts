// Everything the site shows, in one place, so it can be checked against the report before the site goes public.
// Every number below is copied from the final report PDF (public/report/laundered-consensus-report.pdf);
// the comment on each block names the report section or table. No packet text, handoff text, planted line,
// forged note, transcript or answer key belongs in this file (see README.md, "What stays out").

// Set to false only when all three authors agree to publish. `npm run check -- --release` fails while it is true.
export const DRAFT = true;

// The repository is private. The report says: "public once all authors agree; otherwise available on request."
export const CODE_NOTE = "Code and data are available on request. The repository goes public if all three authors agree.";

// Final report, Liezl Coetzee's fixed PDF of 8 Nov (body ends on page 8).
export const REPORT = { src: "/report/laundered-consensus-report.pdf", size: "400 KB" };
export const SLIDES = { src: "/slides/laundered-consensus-slides.pdf", size: "6.4 MB" };

export const VIDEO = {
  src: "/video/laundered-consensus-story.mp4",
  length: "2:07",
  size: "3.7 MB",
};

// Abstract, word for word from the report.
export const ABSTRACT =
  "Monitors in multi-agent systems often read handoff notes written by the agents they oversee. We test whether a watchdog model accepts a claim in those notes that a rule-breaking change was already approved, when no attached record supports it. We call this laundered consensus. Four small watchdogs (Gemma 4 31B, Qwen 3.8 27B, DeepSeek V4 Flash, GLM 5.3 Flash) read the packets. An adaptive attacker that rewrote only the handoffs got 20 of 32 laundered packets cleared by two or more watchdogs under a plain prompt. A one-sentence policy saying that records count cut this to 0 to 2 of 32, and false alarms on valid approvals stayed at the pilot’s level. When the records were hidden from the watchdog, attacks in relay chains succeeded again: 7 to 10 of 32 chains on texts our checker accepted. Fine-tuning Gemma 4 31B cut missed violations on an outside test from a different generator from 41 of 126 to 0 on approvals described but not attached, with 0 to 2 false alarms in about 280 valid rows. Across runs, a watchdog holds when it can see the record and is told the record decides, and fails when it must take a description on trust. For anyone running agent swarms, the safety of the final approval depends on the reviewer’s access to the source record. All data are synthetic, cells are small and labels rest mostly on model readers.";

export type Org = { name: string; url: string; logo: string };

export const ORGS: Record<"sociable" | "altiora" | "apart", Org> = {
  sociable: { name: "Sociable Systems", url: "https://sociable.systems", logo: "/logos/sociable-systems-mark.webp" },
  altiora: { name: "Altiora Systems", url: "https://altiorasystems.com/", logo: "/logos/altiora-mark.png" },
  apart: { name: "Apart Research", url: "https://apartresearch.com", logo: "" },
};

export type Person = {
  slug: "liezl" | "deepayan" | "prashanth";
  name: string;
  initials: string;
  org: keyof typeof ORGS;
  place: string;
  bio: string[];
  contribution: string;
  swatch: string;
};

// Bios as on the Quiet Suppression site; contributions from the Swarm report's Author Contributions.
export const PEOPLE: Person[] = [
  {
    slug: "liezl",
    name: "Liezl Coetzee",
    initials: "LC",
    org: "sociable",
    place: "South Africa",
    bio: [
      "Leads Sociable Systems, a South African research and advisory practice on AI governance and accountability in high-stakes industries, and writes its daily Sociable Systems newsletter.",
      "Social scientist since 2000, working in social impact assessment, resettlement, monitoring and grievance mechanisms on major extractives projects, including twelve years running resettlement data on a large LNG development. Runs comparative experiments on what AI models do to grievance, consultation and approval evidence, built on synthetic cases informed by project experience.",
    ],
    contribution:
      "Pilot and packet design, the scripted and Invent datasets, label checks and the exclusion list, the GLM swarm, related work, limitations and dual-use.",
    swatch: "var(--amber)",
  },
  {
    slug: "deepayan",
    name: "Deepayan Sinha",
    initials: "DS",
    org: "altiora",
    place: "Williamsburg, Virginia, US",
    bio: [
      "Associate (Cohort 2026) at Altiora Systems, the Williamsburg, Virginia consultancy where MBA and graduate-level associates work under senior advisory oversight.",
      "MBA graduate from the Raymond A. Mason School of Business, William & Mary, with concentrations in Business Analytics and Supply Chain Management. Six years at Wipro Ltd leading AI/ML product engineering initiatives across global clients, plus a Lean Six Sigma Green Belt. Beta Gamma Sigma honoree. Bridges technical depth in Python, SQL and data analytics with business judgement for product and operational outcomes.",
    ],
    contribution:
      "Built the attack loop, live chains and scoring code, ran the training and the pre-registered evaluations, wrote the results (sections 4.1 to 4.7), and designed and built this website.",
    swatch: "var(--cream)",
  },
  {
    slug: "prashanth",
    name: "Prashanth Vijay",
    initials: "PV",
    org: "altiora",
    place: "Williamsburg, Virginia, US",
    bio: [
      "Founding Strategy Advisor at Altiora Systems, the Williamsburg, Virginia consultancy that pairs graduate-level associates with experienced advisors. He helped shape Altiora's consulting approach.",
      "9+ years across industrial operations, R&D, sales, business development, supply chain and market research. Holds an MBA in Supply Chain Management and Consulting and a B.E. in Mechanical Engineering, bringing a systems-minded view to growth, operations and emerging technology questions.",
    ],
    contribution:
      "Reviewed the case families and the watchdog prompt, did a blind hand read of 20 held-out packets, drafted text for the exploratory results, limitations, dual-use and false-alarm cost sections, read the draft, and hand-checked 12 attacker texts (yes/no answers by hand and blind, one-line summaries model-assisted).",
    swatch: "var(--coral)",
  },
];

// From the report's Author Contributions. The website line is the team's own addition.
export const WHO_DID_WHAT: { work: string; who: Person["slug"][] }[] = [
  { work: "Pilot and packet design", who: ["liezl"] },
  { work: "Scripted and Invent datasets", who: ["liezl"] },
  { work: "Label checks and exclusion list", who: ["liezl"] },
  { work: "GLM swarm", who: ["liezl"] },
  { work: "Related work, limitations and dual-use", who: ["liezl"] },
  { work: "Attack loop, live chains and scoring code", who: ["deepayan"] },
  { work: "Training and the pre-registered evaluations", who: ["deepayan"] },
  { work: "Results write-up (4.1 to 4.7)", who: ["deepayan"] },
  { work: "Website design and build", who: ["deepayan"] },
  { work: "Review of case families and the watchdog prompt", who: ["prashanth"] },
  { work: "Blind hand read of 20 held-out packets", who: ["prashanth"] },
  { work: "Draft text: exploratory results, limitations, dual-use, false-alarm cost", who: ["prashanth"] },
  { work: "Hand check of 12 attacker texts (exploratory; one-line summaries model-assisted)", who: ["prashanth"] },
  { work: "Project video", who: ["liezl"] },
];

// Report Tables 1 and 2 and Figure 5: laundered packets cleared on 2+ of 4 watchdogs, of 32 (Wilson 95% in brackets).
export type ClearRow = { run: string; plain: string; neutral: string; evidence: string };
export const CLEAR_ROWS: ClearRow[] = [
  { run: "att2: main attack under PLAIN (DeepSeek V4 Flash attacker)", plain: "20 (45 to 77%)", neutral: "", evidence: "" },
  { run: "att2 with DeepSeek’s verdicts dropped (same-model check)", plain: "17 (36 to 69%)", neutral: "", evidence: "" },
  { run: "rep1: replay of the 137 winning att2 texts", plain: "17 (36 to 69%)", neutral: "2 (1.7 to 20%)", evidence: "1 (0.6 to 16%)" },
  { run: "att3: fresh attack, 8,000-token budget", plain: "20", neutral: "1 (0.6 to 16%)", evidence: "2 (1.7 to 20%)" },
  { run: "att4: fresh attack, 16,000-token budget", plain: "20", neutral: "1 (0.6 to 16%)", evidence: "0 (0 to 11%)" },
];

// Report section 4.1 (positive control) and Table 1.
export const SCRIPTED = "0 of 32";

// Report Table 3 (section 4.6, exploratory) and sections 4.4 and Appendix E.
export type VisRow = { run: string; result: string; group: "chains" | "swarm" };
export const VISIBILITY_ROWS: VisRow[] = [
  { group: "chains", run: "Records visible, attacker chains at lengths 3, 6, 12 (ch3)", result: "Cleared on 2+ watchdogs: 2, 3, 2 of 32. Valid successes: 2, 1, 1 of 32." },
  { group: "chains", run: "Records hidden from the watchdog, same chains (ch4)", result: "Cleared on 2+ watchdogs: 25, 27, 24 of 32. Valid successes: 10, 10, 7 of 32 (15, 16, 16 excluded for invented records)." },
  { group: "chains", run: "Hidden records, a relay adds a see-the-record sentence", result: "0 of 32; honest chains 0 of 32." },
  { group: "chains", run: "Valid approvals that need a record (ch4)", result: "Cleared 50 of 50 with records visible, 18 of 50 blind, 0 of 50 blind with the sentence." },
  { group: "swarm", run: "GLM swarm, one compromised reviewer, final reviewer sees notes only", result: "Bad requests cleared: 12 of 12 (plain vouch), 9 of 12 (planted lines). 0 of 12 when it also sees the requests." },
  { group: "swarm", run: "GLM swarm, one-line evidence rule added", result: "0 of 12 for vouches and planted lines; forged record detail still cleared 8 of 12." },
];

// Report section 4.4: live chains with review relays (ch1, ch2).
export const CHAINS_REVIEW = "0 of 32 for honest, attacker and planted-line chains at every length (95% upper limit about 11%).";

// Report Table 4 (section 4.7, exploratory): v789 outside test, 795 packets from a different generator.
export type OutsideRow = { mechanism: string; base: string; sft: string; dpo: string };
export const OUTSIDE_ROWS: OutsideRow[] = [
  { mechanism: "Described but absent (126), missed", base: "41 (32.5%, 25.0 to 41.1)", sft: "0 (0 to 3.0)", dpo: "0 (0 to 3.0)" },
  { mechanism: "Silent record (172), missed", base: "29 (16.9%, 12.0 to 23.2)", sft: "8 (4.7%)", dpo: "4 of 165 (2.4%), 7 parse failures" },
  { mechanism: "Explained gap, should flag (53), missed", base: "13 (24.5%)", sft: "6 (11.3%)", dpo: "4 (7.5%)" },
  { mechanism: "Should-clear rows (280), false alarms", base: "0 (0 to 1.4)", sft: "1", dpo: "2 of 277" },
];

// Report Table 8 (Appendix G): pre-registered held-out set, 261 rows after 17 exclusions.
export type HeldRow = { model: string; missed: string; alarms: string };
export const HELD_ROWS: HeldRow[] = [
  { model: "Base Gemma 4 31B", missed: "10 of 179 (5.6%, 3.1 to 10.0)", alarms: "0 of 82 (0 to 4.5)" },
  { model: "SFT (sftA)", missed: "1 of 179 (0.6%, 0.1 to 3.1)", alarms: "0 of 82" },
  { model: "DPO (dpoB)", missed: "0 of 179 (0 to 2.1)", alarms: "0 of 82" },
  { model: "DPO, rewritten rejects (dpoC, exploratory)", missed: "0 of 179, with 13 of 261 parse failures", alarms: "0 of 82" },
];

// Report section 4.7 and Limitations (5.1).
export const OUTSIDE_ALL = "Across all 795 rows the base is wrong on 83, sftA on 15 and dpoB on 10 of 785.";

// Report section 5.1.
export const LIMITS: { head: string; body: string }[] = [
  { head: "Synthetic data, small cells, budget watchdogs.", body: "Every packet is fictional and rates move with each generator’s templates. The outside test is a stress test built from observed failures, not a prevalence estimate. Many results rest on 12 to 32 items, one sample per cell. We did not test frontier watchdogs or a better-resourced attacker." },
  { head: "Labels rest mostly on model readers.", body: "The outside-test labels come from one model reader in one pass, and two people agreed with them less often than the models did. Without 25 disputed ids, base silent-record misses fall from 29 of 172 to 4 of 147." },
  { head: "Models play more than one role.", body: "DeepSeek V4 Flash wrote training data and was attacker, relay and watchdog (the headline 20 of 32 is 17 of 32 without its verdicts and 9 of 32 without DeepSeek and Gemma). Gemma 4 31B was also checker, tagger and the trained model. GLM 5.3 Flash filled every swarm role." },
  { head: "Training.", body: "One run per method and a held-out set near its ceiling. No training row was shaped by an attack, so we do not claim tuning hardens a watchdog against adaptive attack." },
];

// Report Appendix A: tactics by category only; the specific texts are withheld.
export const WITHHELD =
  "The adaptive attacker’s winning handoffs, the planted lines, the forged notes, the chain and swarm transcripts, the attack-shaped test rows and the answer keys for the held-out and outside test sets.";

export const VIDEO_BY = "Liezl Coetzee";

// Credit as supplied by Liezl Coetzee on 8 Nov 2026.
export const AI_USE_NOTE =
  "Script adapted by Claude (Anthropic) from a Google GeminiNotebook voiceover draft, checked against the report and edited by the team; narration voiced with Revoicer (“Delilah”); animation built with Claude Code using HyperFrames; slide artwork from a Google Gemini draft, edited in Canva, with additional slides and cover art by OpenAI Codex. AI use is detailed in the report’s LLM Usage Statement.";

export const SITE_AI_NOTE = "This site was designed and built by Deepayan Sinha with Claude (Claude Code). All figures and numbers are taken from the report.";
