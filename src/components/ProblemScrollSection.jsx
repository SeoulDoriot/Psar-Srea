import { useEffect, useRef, useState } from "react";

const panels = [
  {
    title: "Fair Prices",
    problem: "Middlemen control prices.",
    solution: "Direct marketplace → farmers sell at fair prices.",
    text: "Farmers often earn less than 600 riel/kg for their crops, while middlemen and markets take most of the value. Phsar Srae connects farmers directly to buyers, ensuring fair prices and immediate sales.",
    visual: "price",
  },
  {
    title: "Domestic Buyers",
    problem: "Lack of local connections → farmers have few domestic buyers.",
    solution: "Fair Price Meter + direct connection to factories, restaurants, hotels, and local companies.",
    text: "Farmers often struggle to find reliable buyers within Cambodia. Phsar Srae connects them directly to local factories, hotels, and companies, showing fair prices so they can plan and sell confidently without middlemen.",
    visual: "buyers",
  },
  {
    title: "Tech Literacy & Connectivity",
    problem: "Many farmers cannot use complex apps.",
    solution: "Telegram-based communication + simple notifications + guided support.",
    text: "Many farmers cannot use complex apps. Phsar Srae helps them use Telegram to receive order notifications, chat with buyers, and follow simple guided steps to manage their sales.",
    visual: "tech",
  },
  {
    title: "Government & Export Support",
    problem: "Farmers lack access to export channels or official programs.",
    solution: "Pre-season contracts + government-verified channels + export support.",
    text: "Phsar Srae helps farmers connect to government programs and export opportunities. Pre-season contracts and verified channels ensure crops can reach international markets, increasing revenue and giving farmers confidence in larger-scale sales.",
    visual: "export",
  },
];

export default function ProblemScrollSection() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      // how far we've scrolled through the pinned track, 0..1
      const p = Math.min(1, Math.max(0, -rect.top / (total || 1)));
      setProgress(p);
      // bias so each panel holds the center of its slice
      const idx = Math.min(panels.length - 1, Math.floor(p * panels.length + 0.001));
      setActive(idx);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="problem-section"
      id="problems"
      ref={trackRef}
      style={{ height: `${panels.length * 100}vh` }}
    >
      <div className="problem-stage page-section">
        <div className="problem-stage-inner">
          <ProgressRail active={active} progress={progress} />

          <div className="problem-deck">
            {panels.map((panel, index) => {
              const state =
                index === active ? "is-active" : index < active ? "is-prev" : "is-next";
              return (
                <article className={`problem-panel ${state}`} key={panel.title} aria-hidden={index !== active}>
                  <div className={`problem-visual visual-${panel.visual}`}>
                    <PanelVisual type={panel.visual} />
                  </div>

                  <div className="problem-content">
                    <span className="panel-count">
                      Panel {String(index + 1).padStart(2, "0")} / 0{panels.length}
                    </span>
                    <h3>{panel.title}</h3>
                    <p className="problem-line problem-line-bad">
                      <span className="line-tag tag-problem">Problem</span>
                      {panel.problem}
                    </p>
                    <p className="problem-line problem-line-good">
                      <span className="line-tag tag-solution">Solution</span>
                      {panel.solution}
                    </p>
                    <p className="problem-text">{panel.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgressRail({ active, progress }) {
  return (
    <div className="problem-rail" aria-hidden="true">
      <p className="section-kicker"><span className="kicker-dot" /> Why Phsar Srae matters</p>
      <div className="rail-line">
        <span className="rail-fill" style={{ height: `${progress * 100}%` }} />
        {panels.map((p, i) => (
          <span key={p.title} className={`rail-dot ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}>
            <em>{i + 1}</em>
            <small>{p.title}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

function PanelVisual({ type }) {
  const base = { viewBox: "0 0 320 320", fill: "none", className: "panel-svg", "aria-hidden": true };
  if (type === "price") {
    return (
      <svg {...base}>
        <circle cx="160" cy="160" r="120" fill="#fff4e0" />
        <g className="pv-float">
          <circle cx="120" cy="150" r="44" fill="#e9a91a" />
          <text x="120" y="162" textAnchor="middle" fontSize="34" fontWeight="800" fill="#fff">៛</text>
        </g>
        <g className="pv-float-slow">
          <rect x="170" y="120" width="100" height="64" rx="12" fill="#2f6842" />
          <path d="M186 152h68M186 140h40" stroke="#bfe0a8" strokeWidth="6" strokeLinecap="round" />
          <path d="M232 168l10-10 10 10" stroke="#bfe0a8" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
        <path d="M70 230 q90 -34 180 0" stroke="#5c9b61" strokeWidth="5" strokeLinecap="round" fill="none" strokeDasharray="2 14" />
      </svg>
    );
  }
  if (type === "buyers") {
    return (
      <svg {...base}>
        <circle cx="160" cy="160" r="120" fill="#eaf4e3" />
        <g className="pv-float">
          <rect x="56" y="120" width="80" height="96" rx="10" fill="#2f6842" />
          <rect x="70" y="138" width="20" height="20" rx="4" fill="#bfe0a8" />
          <rect x="102" y="138" width="20" height="20" rx="4" fill="#bfe0a8" />
          <rect x="84" y="176" width="24" height="40" fill="#173b24" />
        </g>
        <g className="pv-float-slow">
          <rect x="190" y="138" width="74" height="78" rx="10" fill="#e9a91a" />
          <path d="M204 160h46M204 178h46M204 196h28" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        </g>
        <path d="M140 168 q24 -28 50 0" stroke="#5c9b61" strokeWidth="6" fill="none" strokeLinecap="round" />
        <circle cx="140" cy="168" r="7" fill="#5c9b61" />
        <circle cx="190" cy="168" r="7" fill="#5c9b61" />
      </svg>
    );
  }
  if (type === "tech") {
    return (
      <svg {...base}>
        <circle cx="160" cy="160" r="120" fill="#e4f1ef" />
        <g className="pv-float">
          <rect x="118" y="74" width="92" height="172" rx="18" fill="#173b24" />
          <rect x="128" y="92" width="72" height="136" rx="8" fill="#fffaf0" />
          <rect x="138" y="108" width="46" height="16" rx="8" fill="#bfe0a8" />
          <rect x="138" y="134" width="54" height="14" rx="7" fill="#e9eee9" />
          <rect x="138" y="156" width="38" height="14" rx="7" fill="#e9eee9" />
        </g>
        <g className="pv-float-slow">
          <circle cx="214" cy="104" r="26" fill="#229ED9" />
          <path d="M202 105l24-9-9 23-5-8-7 5z" fill="#fff" />
        </g>
      </svg>
    );
  }
  return (
    <svg {...base}>
      <circle cx="160" cy="160" r="120" fill="#eef5e6" />
      <g className="pv-float-slow">
        <circle cx="160" cy="150" r="58" fill="#2f6842" />
        <path d="M102 150h116M160 92v116M120 150a40 80 0 0 0 80 0M120 150a40 80 0 0 1 80 0" stroke="#bfe0a8" strokeWidth="4" fill="none" />
      </g>
      <g className="pv-float">
        <rect x="186" y="180" width="78" height="56" rx="8" fill="#e9a91a" />
        <path d="M198 206h54M198 192h36" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <path d="M214 232l10-12 10 12" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
