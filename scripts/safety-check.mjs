// Pre-publication check: search the built site and the source for things that must not go public.
// Run after `npm run build`. Exits 1 on any hit.
//
//   node scripts/safety-check.mjs                       standard checks
//   node scripts/safety-check.mjs --denylist FILE       also fail on any line of FILE (one phrase per line, case-insensitive).
//                                                       Keep FILE outside this folder: it names the things that must stay private.
//   node scripts/safety-check.mjs --release             also fail while DRAFT is true in src/lib/content.ts
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SKIP_DIRS = new Set(["node_modules", ".git", ".next"]);
const TEXT = new Set([".html", ".js", ".css", ".txt", ".json", ".md", ".ts", ".tsx", ".mjs", ".py", ".xml", ".webmanifest"]);
const ALLOWED_EMAIL = /@(anthropic\.com|example\.com)$/i;

const args = process.argv.slice(2);
const RELEASE = args.includes("--release");
const denyIdx = args.indexOf("--denylist");
const DENYLIST_FILE = denyIdx >= 0 ? args[denyIdx + 1] : null;

const CHECKS = [
  ["email address", /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g],
  ["Google Drive link", /drive\.google\.com|docs\.google\.com/gi],
  ["Discord link", /discord(app)?\.(gg|com)/gi],
  ["invite or join link", /\/join\/[A-Za-z0-9_-]{8,}|invite[_-]?token/gi],
  ["API key", /\bsk-[A-Za-z0-9_-]{16,}|\bAIza[0-9A-Za-z_-]{30,}|\bghp_[A-Za-z0-9]{30,}/g],
  ["form element", /<form[\s>]/gi],
  ["cookie write", /document\.cookie\s*=|set-cookie/gi],
  // Swarm-specific: internal mechanism ids and column names from the withheld answer keys.
  ["internal mechanism id", /described_absent|explained_gap_flag|notes_only_flag|silent_record_flag/gi],
  ["sealed or withheld file name", /WITHHOLD[_.-]|prash-sealed|\bsealed[_-][\w-]*\.(csv|jsonl|tsv)/g],
  ["leftover Quiet Suppression copy", /quiet[- ]suppression-demo|quiet-suppression\.vercel/gi],
];

let denylist = [];
if (DENYLIST_FILE) {
  if (!existsSync(DENYLIST_FILE)) {
    console.log(`denylist file not found: ${DENYLIST_FILE}`);
    process.exit(1);
  }
  denylist = readFileSync(DENYLIST_FILE, "utf8")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith("#"));
}

// This file, the README and the notes name the patterns themselves.
const SELF = new Set(["scripts/safety-check.mjs", "README.md", "NOTES.md"]);

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (TEXT.has(extname(name).toLowerCase())) yield p;
  }
}

let hits = 0;
let files = 0;
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file).replaceAll("\\", "/");
  if (SELF.has(rel)) continue;
  files++;
  const text = readFileSync(file, "utf8");
  for (const [label, re] of CHECKS) {
    for (const m of text.matchAll(re)) {
      if (label === "email address" && (ALLOWED_EMAIL.test(m[0]) || /\.(png|jpe?g|webp|svg|js|css)$/i.test(m[0]))) continue;
      hits++;
      console.log(`${label}: ${rel}: ${m[0].slice(0, 80)}`);
    }
  }
  const lower = text.toLowerCase();
  for (const phrase of denylist) {
    if (lower.includes(phrase.toLowerCase())) {
      hits++;
      console.log(`denylist phrase: ${rel}: (line ${denylist.indexOf(phrase) + 1} of the denylist)`);
    }
  }
}

if (RELEASE) {
  const content = readFileSync(join(ROOT, "src/lib/content.ts"), "utf8");
  if (/export const DRAFT\s*=\s*true/.test(content)) {
    hits++;
    console.log("release gate: DRAFT is still true in src/lib/content.ts (publish only when all three authors agree)");
  }
}

const built = (() => {
  try {
    return statSync(join(ROOT, "out")).isDirectory();
  } catch {
    return false;
  }
})();
console.log(
  `${files} text files checked${built ? " (including out/)" : " (no out/ folder: run npm run build first)"}; ` +
    `${denylist.length} denylist phrase(s); ${hits} hit(s).`,
);
process.exit(hits || !built ? 1 : 0);
