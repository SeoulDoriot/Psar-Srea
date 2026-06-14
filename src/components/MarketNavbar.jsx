import { useEffect, useState } from "react";

const categories = [
  { label: "Fresh", href: "#/buy#fresh", activeRoutes: ["buy"] },
  { label: "Wholesale", href: "#/buy#wholesale", activeRoutes: ["buy"] },
  { label: "Upcoming", href: "#/buy#season", activeRoutes: ["buy"] },
  { label: "Deals", href: "#/buy#deals", activeRoutes: ["buy"] },
];

const welcomeLinks = [
  { label: "Home", href: "#/" },
  { label: "Services", href: "#top" },
  { label: "Farm Zone", href: "#farm-zone-map" },
  { label: "About us", href: "#problems" },
  { label: "Contact", href: "#contact" },
];

function Icon({ name }) {
  const c = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true };
  if (name === "search")
    return (
      <svg {...c}>
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  if (name === "cart")
    return (
      <svg {...c}>
        <path d="M3 4h2l2.4 12.2a1.5 1.5 0 001.5 1.2h8.8a1.5 1.5 0 001.5-1.2L21 8H6.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20.5" r="1.4" fill="currentColor" />
        <circle cx="18" cy="20.5" r="1.4" fill="currentColor" />
      </svg>
    );
  return (
    <svg {...c}>
      <circle cx="12" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5.5 19.5a6.5 6.5 0 0113 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function MarketNavbar({ route = "welcome" }) {
  const isMarketShell = route === "market" || route === "search" || route === "profile" || route === "buy";
  const [lang, setLang] = useState("ខ្មែរ");
  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
    return params.get("q") || "";
  });
  const [currentHash, setCurrentHash] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    const onHash = () => {
      const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
      setQuery(params.get("q") || "");
      setCurrentHash(window.location.hash || "#/");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function submitSearch(event) {
    event.preventDefault();
    const nextQuery = query.trim();
    window.location.hash = nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : "/search";
  }

  return (
    <header className={`market-nav ${route === "welcome" ? "is-welcome" : "is-market"}`}>
      <div className="market-nav-inner">
        <a className="mn-logo" href="#/" aria-label="Phsar Srae home">
          <span className="brand-icon" aria-hidden="true"><span /></span>
          <span className="mn-logo-text">
            <strong>ផ្សារស្រែ</strong>
            <em>Phsar Srae</em>
          </span>
        </a>

        <nav
          className={`mn-cats ${route === "welcome" ? "mn-cats-welcome" : "mn-cats-market"}`}
          aria-label={route === "welcome" ? "Welcome sections" : "Categories"}
        >
          {route === "welcome" ? (
            welcomeLinks.map((link) => (
              <a key={link.label} href={link.href} className={link.label === "Home" ? "is-active" : ""}>
                {link.label}
              </a>
            ))
          ) : (
            <>
              <a href="#/" className={route === "welcome" ? "is-active" : ""}>Home</a>
              {categories.map((c) => {
                const isDefaultFresh = c.label === "Fresh" && route === "buy" && (currentHash === "#/buy" || currentHash === "#/buy#fresh");
                const isActive = isDefaultFresh || (c.activeRoutes.includes(route) && currentHash === c.href);
                return (
                <a key={c.label} href={c.href} className={isActive ? "is-active" : ""}>
                  {c.label}
                </a>
                );
              })}
            </>
          )}
        </nav>

        {isMarketShell && (
          <form className="mn-search" onSubmit={submitSearch} role="search">
            <Icon name="search" />
            <input
              type="search"
              placeholder="Search products or farmers..."
              aria-label="Search products or farmers"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </form>
        )}

        <div className="mn-actions">
          <button
            type="button"
            className="lang-switch"
            onClick={() => setLang((l) => (l === "ខ្មែរ" ? "EN" : "ខ្មែរ"))}
            aria-label="Switch language"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
              <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {lang}
          </button>
          {isMarketShell ? (
            <>
              <a className="icon-btn cart-btn" href="#/buy#cart" aria-label="Cart">
                <Icon name="cart" />
                <span className="cart-badge">2</span>
              </a>
              <a className="avatar" href="#/profile" aria-label="Profile">PS</a>
            </>
          ) : (
            <a className="button button-primary nav-market-cta" href="#/market">
              Explore Market
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
