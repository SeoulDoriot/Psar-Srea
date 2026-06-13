import { useEffect, useState } from "react";

const marketModes = [
  {
    title: "Fresh Market",
    subtitle: "(Buy Now)",
    text: "Fresh crops available today from verified Cambodian farmers.",
    tone: "fresh",
    icon: "basket",
    href: "#/market",
  },
  {
    title: "Wholesale",
    subtitle: "(Make an Offer)",
    text: "Bulk buyers can negotiate supply directly with farmer groups.",
    tone: "wholesale",
    icon: "handshake",
    href: "#/market",
  },
  {
    title: "Upcoming Season",
    subtitle: "(Pre-Order)",
    text: "Reserve harvests before the season starts and plan supply early.",
    tone: "upcoming",
    icon: "calendar",
    href: "#/market#upcoming",
  },
  {
    title: "Good Price",
    subtitle: "(Surplus)",
    text: "Move surplus crops faster with fair offers from trusted buyers.",
    tone: "surplus",
    icon: "tag",
    href: "#/market#featured",
  },
];

const stats = [
  { value: "10,000+", label: "Farmers", sub: "កសិករចូលរួម", icon: "people" },
  { value: "500+", label: "Buyers", sub: "អ្នកទិញធំៗ", icon: "store" },
  { value: "2,500+", label: "Tons listed", sub: "ផលិតផលបានដាក់", icon: "leaf" },
  { value: "30%+", label: "Better access", sub: "ទីផ្សារល្អជាងមុន", icon: "growth" },
];

function Icon({ name }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
  };

  if (name === "basket") {
    return (
      <svg {...common}>
        <path d="M6 10h12l-1.3 8.2A2 2 0 0114.7 20H9.3a2 2 0 01-2-1.8L6 10z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 10a3 3 0 016 0M9 14h.01M12 14h.01M15 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "handshake") {
    return (
      <svg {...common}>
        <path d="M7 12l3.2-3.2a2.4 2.4 0 013.4 0L17 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 10l4 5.5a2 2 0 002.9.25L12 14.7l1.1 1.05a2 2 0 002.9-.25L20 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 16l2 2M12 14.7l2 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 3v4M16 3v4M4 10h16M9 15l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "tag") {
    return (
      <svg {...common}>
        <path d="M4 12.5V5h7.5L20 13.5 13.5 20 4 12.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="8.2" cy="8.2" r="1.2" fill="currentColor" />
        <path d="M11 14l4-4M10.5 10.5h.01M15.5 14.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "people") {
    return (
      <svg {...common}>
        <path d="M8.5 11a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM15.5 11a3 3 0 100-6 3 3 0 000 6z" fill="currentColor" opacity="0.9" />
        <path d="M3.5 20a5 5 0 0110 0M10.5 20a5 5 0 0110 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "store") {
    return (
      <svg {...common}>
        <path d="M5 10h14l-1.2-5H6.2L5 10zM6 10v10h12V10M9 20v-5h6v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4.8 10a2.2 2.2 0 004.4 0 2.2 2.2 0 004.4 0 2.2 2.2 0 004.4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "growth") {
    return (
      <svg {...common}>
        <path d="M4 19h16M6 17v-5M12 17V8M18 17V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M5 11l5-5 4 4 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 19c0-7 5-12 14-12 0 7-5 12-14 12z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M5 19c3-4 6-6 11-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`hero-section page-section ${mounted ? "is-mounted" : ""}`} id="top">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="hero-badge hero-anim hero-anim-1">
            <Icon name="leaf" />
            Khmer-first farmer marketplace
          </p>
          <h1 className="hero-anim hero-anim-2">
            Fair prices, <br />
            <span className="hero-headline-accent">straight from the farm.</span>
            <svg className="hero-leaf" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 21c0-8 6-15 18-17 0 9-7 16-18 17z" fill="#5c9b61" />
              <path d="M5 19c4-5 8-8 13-9" stroke="#2f6842" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </h1>
          <p className="hero-sub hero-anim hero-anim-3">
            Phsar Srae (ផ្សារស្រែ) connects Cambodian farmers directly to
            factories and bulk buyers — so they sell more, waste less, and earn fairly.
          </p>

          <div className="hero-market-grid hero-anim hero-anim-4" aria-label="Marketplace options">
            {marketModes.map((mode) => (
              <a className={`market-mode-card mode-${mode.tone}`} href={mode.href} key={mode.title}>
                <span className="mode-icon">
                  <Icon name={mode.icon} />
                </span>
                <strong>{mode.title}</strong>
                <em>{mode.subtitle}</em>
                <small>{mode.text}</small>
                <span className="mode-cta">Open →</span>
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-label="Cambodian farmer holding fresh produce">
          <div className="hero-photo-card">
            <img
              src="/images/Farmer.png"
              alt="Cambodian farmer holding a basket of fresh vegetables in a farm field"
            />
            <div className="hero-photo-line" aria-hidden="true" />
          </div>

          <div className="floating-card fc-photo-farmers">
            <span className="fc-icon">
              <Icon name="people" />
            </span>
            <span className="fc-text">
              <strong>10,000+</strong>
              <small>Farmers</small>
            </span>
          </div>
          <div className="floating-card fc-photo-price">
            <span className="fc-icon">
              <Icon name="shield" />
            </span>
            <span className="fc-text">
              <strong>Fair Price</strong>
              <small>Transparent offers</small>
            </span>
          </div>
          <div className="floating-card fc-photo-sale">
            <span className="fc-icon">
              <Icon name="calendar" />
            </span>
            <span className="fc-text">
              <strong>Guaranteed Sale</strong>
              <small>Pre-season contracts</small>
            </span>
          </div>
        </div>
      </div>

      <div className="hero-stats-bar hero-anim hero-anim-5" aria-label="Marketplace stats">
        {stats.map((stat) => (
          <article key={stat.label}>
            <span className="stat-icon">
              <Icon name={stat.icon} />
            </span>
            <div>
              <strong>{stat.value}</strong>
              <span>{stat.sub}</span>
              <small>{stat.label}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
