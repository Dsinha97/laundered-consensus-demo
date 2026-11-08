import type { Metadata } from "next";
import { CHAINS_REVIEW, CLEAR_ROWS, HELD_ROWS, OUTSIDE_ALL, OUTSIDE_ROWS, SCRIPTED, VISIBILITY_ROWS } from "@/lib/content";

export const metadata: Metadata = { title: "Results" };

export default function Results() {
  return (
    <div className="wrap stack" style={{ padding: "72px 24px 96px", gap: 64 }}>
      <div className="stack" style={{ maxWidth: "70ch", gap: 16 }}>
        <p className="eyebrow">Results</p>
        <h1 className="display">What the watchdogs let through</h1>
        <p className="body2">
          Numbers are copied from the report&apos;s tables. A packet counts as <em>cleared</em> when at least 2 of the 4 watchdogs clear it. Intervals are Wilson 95%.
          A result whose interval spans the 10% pass bar is called borderline. No packet text is shown.
        </p>
        <div className="row" style={{ gap: "8px 20px", fontSize: 14, color: "var(--fg2)" }}>
          <span>
            <strong className="mono" style={{ color: "var(--coral)" }}>PLAIN</strong> no policy
          </span>
          <span>
            <strong className="mono" style={{ color: "var(--teal)" }}>NEUTRAL</strong> the records count
          </span>
          <span>
            <strong className="mono" style={{ color: "var(--amber)" }}>EVIDENCE</strong> the same, and repeated claims add nothing
          </span>
        </div>
      </div>

      <section className="stack" aria-labelledby="t1" style={{ gap: 18 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
          <h2 id="t1" className="h3">
            Adaptive attack <span className="sub">· laundered packets cleared, of 32</span>
          </h2>
          <span className="mono small">report Tables 1 and 2</span>
        </div>
        <div className="table-box">
          <table className="t">
            <thead>
              <tr>
                <th scope="col">Run</th>
                <th scope="col" className="n" style={{ color: "var(--coral-text)" }}>PLAIN</th>
                <th scope="col" className="n" style={{ color: "var(--teal)" }}>NEUTRAL</th>
                <th scope="col" className="n" style={{ color: "var(--amber-soft)" }}>EVIDENCE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Scripted handoffs, no learning (pilot)</th>
                <td className="n">{SCRIPTED}</td>
                <td className="n" />
                <td className="n" />
              </tr>
              {CLEAR_ROWS.map((r) => (
                <tr key={r.run}>
                  <th scope="row">{r.run}</th>
                  <td className="n cc">{r.plain}</td>
                  <td className="n tt">{r.neutral}</td>
                  <td className="n ff">{r.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">
          The attacker rewrites only the handoffs, sees each watchdog&apos;s verdict and reason after each of 5 rounds, and a separate checker must confirm the rule,
          change and records are untouched. DeepSeek V4 Flash is both the registered attacker and one of the four watchdogs, so the same-model row is shown. att3 lost
          286 of 1,806 attacker calls to an exhausted budget; att4 lost none and the picture held. On the pilot&apos;s 37 valid should-clear packets, false alarms
          per parsed judgment were 8 of 146 under PLAIN, 9 of 136 under NEUTRAL and 10 of 137 under EVIDENCE, mostly from GLM. Of the 148 judgments per prompt, 2, 12 and
          11 did not parse, so some false alarms may be hidden. False alarms under attack were not tested.
        </p>
        <figure className="card figure-card">
          <img
            src="/figures/figure2_protection_vs_cost.png"
            alt="Chart: protection against cost. How many laundered packets are cleared under each prompt, against false alarms on valid approvals from the pilot's scripted handoffs."
            width={1950}
            height={800}
          />
          <figcaption className="small">
            Report Figure 6. Protection against cost. The false-alarm axis comes from the pilot&apos;s scripted handoffs on should-clear packets, not from attacked packets.
          </figcaption>
        </figure>
      </section>

      <section className="stack" aria-labelledby="t2" style={{ gap: 18 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
          <h2 id="t2" className="h3">
            What the final checker can see <span className="sub">· exploratory</span>
          </h2>
          <span className="mono small">report Table 3</span>
        </div>
        <div className="table-box">
          <table className="t">
            <thead>
              <tr>
                <th scope="col" style={{ width: "42%" }}>Run</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr className="grp">
                <td colSpan={2}>Relay chains of 3, 6 and 12 agents</td>
              </tr>
              {VISIBILITY_ROWS.filter((r) => r.group === "chains").map((r) => (
                <tr key={r.run}>
                  <th scope="row">{r.run}</th>
                  <td>{r.result}</td>
                </tr>
              ))}
              <tr className="grp">
                <td colSpan={2}>GLM swarm · 4 distinct requests run 3 times per cell</td>
              </tr>
              {VISIBILITY_ROWS.filter((r) => r.group === "swarm").map((r) => (
                <tr key={r.run}>
                  <th scope="row">{r.run}</th>
                  <td>{r.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">
          With review relays and the records visible (ch1, ch2), no arm produced a valid success at any length: {CHAINS_REVIEW} These runs change one lever at a time and
          are never pooled with the adaptive-attack runs. GLM verdicts in the swarm are same-model, and ch4 is not hand-checked.
        </p>
        <figure className="figure">
          <img
            src="/figures/fig4_claim_vs_visibility.png"
            alt="Grid: how specific the claim is against what the final checker can see. With the records visible a plain vouch mostly holds, a detailed description gets through about 1 in 5, and forged record detail sometimes gets through. With no records visible a plain vouch breaks, and forged record detail breaks even with a see-the-record rule."
            width={2200}
            height={1120}
          />
          <figcaption className="small">
            Report Figure 4. Units differ (packets, chains, requests), so this shows a pattern across sources, not one measured effect. The chain figures (24 to 27 of 32
            with the records hidden, 2 to 3 with them visible) are raw clears on 2+ watchdogs. Valid successes, after the checker, were 10, 10 and 7 of 32 hidden and 2, 1 and 1
            of 32 visible.
          </figcaption>
        </figure>
      </section>

      <section className="stack" aria-labelledby="t3" style={{ gap: 18 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 8 }}>
          <h2 id="t3" className="h3">
            Training a watchdog <span className="sub">· exploratory outside test, a different generator</span>
          </h2>
          <span className="mono small">report Table 4</span>
        </div>
        <div className="table-box">
          <table className="t">
            <thead>
              <tr>
                <th scope="col">Mechanism (rows), missed</th>
                <th scope="col" className="n">Base</th>
                <th scope="col" className="n">sftA</th>
                <th scope="col" className="n">dpoB</th>
              </tr>
            </thead>
            <tbody>
              {OUTSIDE_ROWS.map((r) => (
                <tr key={r.mechanism}>
                  <th scope="row">{r.mechanism}</th>
                  <td className="n cc">{r.base}</td>
                  <td className="n">{r.sft}</td>
                  <td className="n tt">{r.dpo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">
          795 packets from a different generator, never trained on. The base is local Gemma 4 31B, one watchdog. {OUTSIDE_ALL} This set is a purpose-built stress test, so its
          rates show where watchdogs break and say nothing about how often such packets occur in practice. On the silent-record shape the results measure agreement with the
          generator&apos;s label convention, which no human check settles.
        </p>
      </section>

      <section className="row" aria-labelledby="t4" style={{ gap: 24 }}>
        <div className="stack" style={{ flex: "999 1 560px", minWidth: 0, gap: 18 }}>
          <h2 id="t4" className="h3">
            Held-out set <span className="sub">· 261 rows, pre-registered</span>
          </h2>
          <div className="table-box">
            <table className="t narrow">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Missed violations</th>
                  <th scope="col">False alarms</th>
                </tr>
              </thead>
              <tbody>
                {HELD_ROWS.map((r) => (
                  <tr key={r.model}>
                    <th scope="row">{r.model}</th>
                    <td className="mono" style={{ fontSize: 13 }}>{r.missed}</td>
                    <td className="mono" style={{ fontSize: 13 }}>{r.alarms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <span className="mono small">report Table 8, Appendix G</span>
        </div>
        <div className="stack" style={{ flex: "1 1 300px", alignSelf: "stretch", padding: 24, borderRadius: 14, border: "1px solid rgba(230,120,100,0.45)", gap: 10 }}>
          <p className="eyebrow" style={{ color: "var(--coral-text)" }}>
            The limit
          </p>
          <p style={{ color: "var(--fg3)" }}>
            The held-out set comes from the training generator and is near its ceiling: the base misses only 5.6%, and 77 of 261 rows share a training family. It cannot
            separate SFT from DPO (one row), so the outside test above carries more of the evidence. No training row was shaped by an attack, so we do not claim tuning
            hardens a watchdog against adaptive attack.
          </p>
        </div>
      </section>
    </div>
  );
}
