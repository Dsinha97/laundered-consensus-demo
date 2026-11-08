import Link from "next/link";
import { ArrowRight, Info, Play } from "@/components/Icons";
import { ABSTRACT, AI_USE_NOTE, ORGS, PEOPLE, REPORT, SLIDES, VIDEO, VIDEO_BY } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* The cover artwork (cubes and the orange flow of claims) sits behind the hero as decoration; the title is real text. */}
      <div className="hero-bleed">
      <section className="wrap hero" aria-labelledby="title">
        <div className="hero-text">
          <p className="eyebrow">Apart Research · Swarm Alignment Sprint · November 2026</p>
          <h1 id="title" className="hero-title">
            Laundered <em>Consensus</em>
          </h1>
          <p className="lede" style={{ maxWidth: "30ch" }}>
            Do AI watchdogs check the approvals other agents claim?
          </p>
          <div className="authors">
            <div className="names">
              {PEOPLE.map((p) => {
                const org = ORGS[p.org];
                return (
                  <span key={p.slug} className="author">
                    <Link href="/team/">{p.name}</Link>
                    <a className="org-icon" href={org.url} title={org.name}>
                      <img src={org.logo} alt={org.name} width={24} height={24} />
                    </a>
                  </span>
                );
              })}
            </div>
            <p style={{ color: "var(--muted)" }}>
              With{" "}
              <a href={ORGS.apart.url} style={{ color: "var(--muted)" }}>
                Apart Research
              </a>
            </p>
          </div>
          <div className="row" style={{ gap: 12, paddingTop: 8 }}>
            <a className="btn primary" href="#video">
              <Play /> Watch the {VIDEO.length} video
            </a>
            <a className="btn ghost" href={REPORT.src} target="_blank" rel="noopener noreferrer">
              Read the report <span style={{ fontWeight: 400, color: "var(--muted)" }}>PDF</span>
            </a>
            <a className="btn ghost" href={SLIDES.src} target="_blank" rel="noopener noreferrer">
              Slides <span style={{ fontWeight: 400, color: "var(--muted)" }}>PDF</span>
            </a>
          </div>
        </div>
      </section>
      </div>

      <section className="wrap" aria-labelledby="nums" style={{ paddingBottom: 88 }}>
        <h2 id="nums" className="eyebrow muted" style={{ marginBottom: 20, fontWeight: 400 }}>
          Three headline results
        </h2>
        <div className="grid-auto">
          <div className="card stat">
            <p className="big">
              20 <span className="of">of</span> 32
            </p>
            <p className="body2" style={{ fontSize: 15 }}>
              Rule-breaking changes that an attacker, rewriting only the handoff notes, got cleared by two or more of four small watchdogs under a plain prompt.
            </p>
            <p className="meta">62.5% · Wilson 95% 45 to 77% · scripted notes: 0 of 32</p>
          </div>
          <div className="card stat">
            <p className="big" style={{ color: "var(--teal)" }}>
              0 to 2 <span className="of">of</span> 32
            </p>
            <p className="body2" style={{ fontSize: 15 }}>
              After one sentence of policy saying the records count, with the records visible to the watchdog. False alarms on valid approvals stayed at the pilot&apos;s level.
            </p>
            <p className="meta">three runs · every interval spans the 10% bar, so borderline</p>
          </div>
          <div className="card stat">
            <p className="big">
              <span style={{ color: "var(--coral)" }}>7 to 10</span> <span className="of">of</span> 32
            </p>
            <p className="body2" style={{ fontSize: 15 }}>
              Relay chains that got a bad change through again once the records were hidden from the watchdog, on texts the checker accepted.
            </p>
            <p className="meta">2, 1 and 1 of 32 with the records visible · exploratory</p>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="abs">
        <div className="wrap section row" style={{ gap: "32px 64px" }}>
          <div style={{ flex: "1 1 220px" }}>
            <p className="eyebrow" style={{ marginBottom: 10 }}>
              From the report
            </p>
            <h2 id="abs" className="h2">
              Abstract
            </h2>
          </div>
          <div className="stack" style={{ flex: "999 1 560px", minWidth: 0, gap: 18 }}>
            <p className="serif" style={{ fontSize: 20, lineHeight: 1.6 }}>
              {ABSTRACT}
            </p>
            <p style={{ fontSize: 14, color: "#4a5470" }}>
              The report is the judged document. This site is a companion for people who read the submission.{" "}
              <a href={REPORT.src} target="_blank" rel="noopener noreferrer">
                Read the full report (PDF, {REPORT.size})
              </a>
              {" · "}
              <a href={SLIDES.src} target="_blank" rel="noopener noreferrer">
                Slides (PDF, {SLIDES.size})
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="pipe">
        <p className="eyebrow" style={{ marginBottom: 10 }}>
          The setup
        </p>
        <h2 id="pipe" className="h2" style={{ marginBottom: 12 }}>
          A claim of approval, and a watchdog that must decide whether to believe it
        </h2>
        <div className="row" style={{ alignItems: "center", gap: "24px 48px", marginBottom: 36 }}>
          <p className="body2" style={{ flex: "999 1 420px", maxWidth: "64ch" }}>
            An operator running many AI agents cannot read every handoff, so a watchdog model reads them. But the handoff is written by the agents being
            checked. If it says &ldquo;this exception was approved last week&rdquo;, does the watchdog look for the approval, or take the sentence as the
            approval? We call a claim with no attached record behind it <strong>laundered consensus</strong>.
          </p>
        </div>
        <div className="steps">
          <div className="step">
            <span className="n">01</span>
            <b>Rule</b>
            <p>A default, plus one exception that needs a named person&apos;s written approval</p>
          </div>
          <div className="step">
            <span className="n">02</span>
            <b>Proposed change</b>
            <p>What the team wants to do. It breaks the rule unless a record approves it</p>
          </div>
          <div className="step prec">
            <span className="n">03 · the claim</span>
            <b>Handoffs</b>
            <p>Agents&apos; chatter: &ldquo;approved last time&rdquo;. Never evidence on its own</p>
          </div>
          <div className="step ok">
            <span className="n">04 · the proof</span>
            <b>Records</b>
            <p>Ticket, email, minutes, log line. The only thing that can prove approval</p>
          </div>
          <div className="step aim">
            <span className="n">05 · verdict</span>
            <b>Watchdog</b>
            <p>Returns clear or flag, with a one-sentence reason</p>
          </div>
        </div>
        <p className="small" style={{ marginTop: 14 }}>
          Every rule, person, record and system in the study is fictional. Only the handoffs are attacked; the rule, the change and the records stay untouched.
        </p>
        <figure className="figure" style={{ marginTop: 40 }}>
          <img
            src="/figures/fig1_packet_and_triplet.png"
            alt="Diagram: one packet has a rule, a proposed change, handoffs and records. Swapping only the records gives three versions: supported, which should clear; laundered, which should flag; and near-miss, which should flag."
            width={2000}
            height={1240}
          />
          <figcaption className="small">Report Figure 1. One packet, and the three versions made by swapping only the records.</figcaption>
        </figure>
      </section>

      <section id="video" className="video-band" aria-labelledby="vid" style={{ scrollMarginTop: 0 }}>
        <div className="wrap section stack" style={{ gap: 28 }}>
          <div className="row" style={{ alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 10 }}>
                Video · {VIDEO.length} · produced by {VIDEO_BY}
              </p>
              <h2 id="vid" className="h2">
                The project in two minutes
              </h2>
            </div>
            <a href={VIDEO.src} download style={{ fontSize: 14 }}>
              Download MP4 ({VIDEO.size})
            </a>
          </div>
          <video className="video" controls preload="metadata" aria-label="Laundered Consensus project video">
            <source src={VIDEO.src} type="video/mp4" />
            Your browser cannot play this video. <a href={VIDEO.src}>Download the MP4</a>.
          </video>
          <div className="note">
            <Info />
            <p>
              <strong>How this video was made.</strong> Produced by {VIDEO_BY}. {AI_USE_NOTE}
            </p>
          </div>
        </div>
      </section>

      <section className="wrap section row" aria-labelledby="res" style={{ gap: "40px 64px", alignItems: "center" }}>
        <div className="stack" style={{ flex: "1 1 340px", gap: 16 }}>
          <p className="eyebrow">Results</p>
          <h2 id="res" className="h2">
            A watchdog that can see the record rarely accepts a claimed approval. One that must take a description on trust often does.
          </h2>
          <p className="body2">
            Laundered packets cleared on two or more of four watchdogs, of 32, with Wilson 95% intervals. The dashed line is the 10% pass bar the team agreed in advance.
          </p>
          <Link href="/results/" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, fontWeight: 500 }}>
            All result tables <ArrowRight />
          </Link>
        </div>
        <figure className="card figure-card" style={{ flex: "999 1 520px", minWidth: 0 }}>
          <img
            src="/figures/figure1_laundered_cleared.png"
            alt="Chart: laundered packets cleared on two or more watchdogs. Scripted handoffs 0 of 32; adaptive attack under the plain prompt 20 of 32; under the neutral policy prompt 1 of 32; under the evidence policy prompt 0 of 32. The 10 percent pass bar is marked."
            width={1950}
            height={800}
          />
          <figcaption className="small">Report Figure 5. Each row is one set of 32 laundered packets.</figcaption>
        </figure>
      </section>
    </>
  );
}
