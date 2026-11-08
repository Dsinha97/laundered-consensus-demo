import { CODE_NOTE, REPORT, SLIDES } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="brand" style={{ alignSelf: "flex-start" }}>
          <img src="/brand/mark-256.png" alt="" width={32} height={32} style={{ borderRadius: 8 }} />
          <span style={{ fontSize: 18 }}>Laundered Consensus</span>
        </div>
        <div className="text">
          <p>
            The <a href={REPORT.src} target="_blank" rel="noopener noreferrer">report (PDF)</a> is the judged document (<a href={SLIDES.src} target="_blank" rel="noopener noreferrer">slides</a> are a short summary of it); this site is a companion to it. {CODE_NOTE}
          </p>
          <p>
            Made for the Apart Research Swarm Alignment Sprint, November 2026. All packets, rules, people and records in the study are fictional. The specific attack texts are withheld on purpose; tactics are described by category only.
          </p>
          <p>
            Site designed and built by Deepayan Sinha with Claude (Claude Code). Project video produced by Liezl Coetzee; how it was made is described under the video on the home page. No cookies, forms or tracking.
          </p>
        </div>
      </div>
    </footer>
  );
}
