import type { Metadata } from "next";
import Link from "next/link";
import { LIMITS, WITHHELD } from "@/lib/content";

export const metadata: Metadata = { title: "Findings" };

const TOC = [
  ["setting", "The setting"],
  ["measured", "What we tested"],
  ["results", "What we found"],
  ["advice", "What to do about it"],
  ["limits", "Limits"],
  ["withheld", "What stays out"],
];

export default function Findings() {
  return (
    <div className="wrap row" style={{ padding: "72px 24px 96px", gap: "48px 72px" }}>
      <nav className="toc" aria-label="On this page">
        <p className="eyebrow muted" style={{ marginBottom: 8 }}>
          On this page
        </p>
        {TOC.map(([id, label]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <article className="article">
        <div className="stack" style={{ gap: 18 }}>
          <p className="eyebrow">Findings</p>
          <h1 className="display">When a claim of approval becomes the approval</h1>
          <p className="lede">
            A watchdog reads notes written by the agents it checks. If one agent says a change was approved, and the watchdog treats that sentence as the approval, one
            agent&apos;s claim becomes the swarm&apos;s approval. No secret channel is needed.
          </p>
        </div>

        <section id="setting">
          <h2 className="h3" style={{ fontSize: 30 }}>The setting</h2>
          <p className="body2">
            A packet has four parts: a rule, a proposed change, the handoffs and the records. The change breaks the rule unless a record approves it. A watchdog reads the
            packet and returns <em>clear</em> or <em>flag</em> with a one-sentence reason. In a <strong>laundered</strong> packet the handoffs claim the change was approved
            before, but no attached record says so. Four small watchdogs read the packets: Gemma 4 31B, Qwen 3.8 27B, DeepSeek V4 Flash and GLM 5.3 Flash. The pilot has 87
            rows from 39 sets, with 48 attack targets.
          </p>
        </section>

        <section id="measured">
          <h2 className="h3" style={{ fontSize: 30 }}>What we tested</h2>
          <div className="tiles">
            <div className="tile">
              <b>An adaptive attacker</b>
              <p>Rewrites only the handoffs, sees each verdict, tries for 5 rounds. A separate checker confirms every win.</p>
            </div>
            <div className="tile">
              <b>Two policy prompts</b>
              <p>One sentence saying the records count; a second adding that repeated claims add nothing.</p>
            </div>
            <div className="tile">
              <b>Chains and a swarm</b>
              <p>Relay chains of 3, 6 and 12 agents, and a small GLM swarm with one compromised reviewer.</p>
            </div>
            <div className="tile">
              <b>What the checker sees</b>
              <p>The final checker with the records, without them, or with only the team&apos;s notes.</p>
            </div>
            <div className="tile">
              <b>Fine-tuning</b>
              <p>One watchdog trained with SFT, then DPO, and scored on a frozen held-out set and an outside test.</p>
            </div>
          </div>
          <figure className="figure" style={{ marginTop: 12 }}>
            <img
              src="/figures/fig3_attack_setups.png"
              alt="Two attack setups. A: a con artist rewrites the handoffs and gets each watchdog's verdict back, for up to 5 rounds; under plain instructions 20 of 32 bad cases cleared. B: a live chain of agents ending in a final checker; with records visible 2 to 3 of 32 got through, with notes only 24 to 27 of 32."
              width={2000}
              height={1020}
            />
            <figcaption className="small">Report Figure 3. The attack setups, described by category only. The chain figures (24 to 27 of 32 with the records hidden, 2 to 3 with them visible) are raw clears on 2+
              watchdogs. Valid successes, after the checker, were 10, 10 and 7 of 32 hidden and 2, 1 and 1 of 32 visible.</figcaption>
          </figure>
        </section>

        <section id="results">
          <h2 className="h3" style={{ fontSize: 30 }}>What we found</h2>
          <ol className="findings">
            <li className="coral">
              <span className="n">01</span>
              <div>
                <b>With feedback, an attacker gets past the watchdogs.</b>
                <p>Under a plain prompt, 20 of 32 laundered packets were cleared by two or more of four watchdogs, against 0 of 32 for scripted handoffs.</p>
              </div>
            </li>
            <li className="teal">
              <span className="n">02</span>
              <div>
                <b>One sentence saying the records count removes most of it.</b>
                <p>
                  With the records visible, clears fell to 0 to 2 of 32 across the policy runs. Every interval spans the 10% bar, so by the agreed rule each is borderline.
                  We see no reliable break under this attacker and budget, not proof of robustness.
                </p>
              </div>
            </li>
            <li className="coral">
              <span className="n">03</span>
              <div>
                <b>Hide the records and it breaks again (exploratory).</b>
                <p>
                  In relay chains, clears rose from 2, 3 and 2 of 32 to 25, 27 and 24, and valid successes from 2, 1 and 1 to 10, 10 and 7. A see-the-record sentence stopped
                  the attack, but blocked every valid approval that needed a record, because a blind watchdog cannot confirm one.
                </p>
              </div>
            </li>
            <li className="amber">
              <span className="n">04</span>
              <div>
                <b>Detail beats a bare claim (exploratory).</b>
                <p>
                  Detailed descriptions of an absent record got past two or more of four hosted watchdogs on 28 of 126 outside-test packets. Forged record detail beat an
                  evidence rule when the final reviewer saw only notes (8 of 12).
                </p>
              </div>
            </li>
            <li className="teal">
              <span className="n">05</span>
              <div>
                <b>Training helped on an exploratory outside test.</b>
                <p>
                  On an outside test from a different generator, the base Gemma missed 41 of 126 described-but-absent packets; the tuned models missed none, with 0 to 2 false
                  alarms in about 280 valid rows. This is a purpose-built stress test, and we do not claim it hardens a watchdog against adaptive attack.
                </p>
              </div>
            </li>
          </ol>
          <Link href="/results/" style={{ alignSelf: "flex-start", minHeight: 44, display: "inline-flex", alignItems: "center", fontWeight: 500 }}>
            See every table in Results →
          </Link>
        </section>

        <section id="advice">
          <h2 className="h3" style={{ fontSize: 30 }}>What to do about it</h2>
          <p className="body2">
            The final decider in a swarm often sees only a summary written by other agents. Our results suggest its safety depends less on its instructions than on whether
            it can read the source record.
          </p>
          <ul className="bullets body2">
            <li>Give the final decider the records themselves, and make records hard to fake.</li>
            <li>Where one watchdog is weak, use a panel that flags when any member flags. On the outside test such a panel missed 1 of 126 described-but-absent packets at 5 false alarms in 280 (not tested on fresh data).</li>
            <li>Keep false alarms near baseline, send flags that cite a missing record to a human queue, and keep approval records machine-readable.</li>
            <li>A deterministic check of cited record ids against the source is a further step we did not test.</li>
          </ul>
        </section>

        <section id="limits" className="band" style={{ padding: 28, borderRadius: 14, gap: 12 }}>
          <h2 className="h3" style={{ fontSize: 30 }}>Limits</h2>
          <ul className="bullets" style={{ color: "#2a3552" }}>
            {LIMITS.map((l) => (
              <li key={l.head}>
                <strong>{l.head}</strong> {l.body}
              </li>
            ))}
          </ul>
        </section>

        <section id="withheld">
          <h2 className="h3" style={{ fontSize: 30 }}>What stays out</h2>
          <p className="body2">
            The work maps which claims get a rule-breaking change past an AI watchdog. The specific texts that worked would give real help to an attacker, so we describe
            tactics by category only and withhold: {WITHHELD.charAt(0).toLowerCase() + WITHHELD.slice(1)}
          </p>
          <p className="body2">
            The weakness is already reachable by anyone who deploys a chain of agents with a final AI reviewer. Publishing the categories and the fixes helps those who run or
            audit such systems more than it helps an attacker, who still has to write and test their own texts. The report&apos;s Appendix A has the full statement.
          </p>
        </section>
      </article>
    </div>
  );
}
