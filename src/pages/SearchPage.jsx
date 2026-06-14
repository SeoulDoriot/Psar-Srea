import { useEffect, useMemo, useState } from "react";

const filters = [
  { key: "all", label: "All" },
  { key: "fresh", label: "Fresh" },
  { key: "wholesale", label: "Wholesale" },
  { key: "season", label: "Season" },
  { key: "deal", label: "Deals" },
  { key: "farmer", label: "Farmers" },
];

const popularSearches = ["mango", "tomato", "coconut", "banana", "rice", "Kampong Speu"];

const searchItems = [
  {
    id: "fresh-mango-sokchan",
    type: "fresh",
    kh: "ស្វាយកែវរមៀត",
    en: "Keo Romeat Mango",
    farmer: "Sok Chan Farm",
    province: "Kampong Speu",
    price: "500៛/kg",
    quantity: "80 kg today",
    badge: "Fresh Grade A",
    cta: "Add to Cart",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80",
    keywords: ["crop", "fresh product", "mango", "keo romeat", "kampong speu", "farmer", "fruit"],
  },
  {
    id: "fresh-coconut-kandal",
    type: "fresh",
    kh: "ដូងខ្ចី",
    en: "Young Coconut",
    farmer: "Kandal Fresh Farm",
    province: "Kandal",
    price: "1,200៛/each",
    quantity: "140 each today",
    badge: "Ready Now",
    cta: "Add to Cart",
    image: "https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?auto=format&fit=crop&w=900&q=80",
    keywords: ["crop", "fresh product", "coconut", "young coconut", "kandal", "item based"],
  },
  {
    id: "fresh-tomato-takeo",
    type: "fresh",
    kh: "ប៉េងប៉ោះ",
    en: "Tomato",
    farmer: "Dara Farm",
    province: "Takeo",
    price: "900៛/kg",
    quantity: "45 kg today",
    badge: "Fresh",
    cta: "Add to Cart",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80",
    keywords: ["crop", "fresh product", "tomato", "takeo", "vegetable"],
  },
  {
    id: "wholesale-mango-coop",
    type: "wholesale",
    kh: "ស្វាយកែវរមៀត",
    en: "Keo Romeat Mango",
    farmer: "Kampong Speu Co-op",
    province: "Kampong Speu",
    price: "1,800 - 2,200៛/kg",
    quantity: "8,500 kg",
    badge: "Export Ready",
    cta: "Make Offer",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=900&q=80",
    keywords: ["wholesale", "bulk", "supply", "mango", "kampong speu", "supplier", "export"],
  },
  {
    id: "wholesale-rice-battambang",
    type: "wholesale",
    kh: "ស្រូវផ្ការំដួល",
    en: "Jasmine Rice Paddy",
    farmer: "Battambang Rice Co-op",
    province: "Battambang",
    price: "1,000 - 1,300៛/kg",
    quantity: "12,000 kg",
    badge: "Bulk Supply",
    cta: "Make Offer",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=80",
    keywords: ["wholesale", "bulk", "supply", "rice", "battambang", "factory"],
  },
  {
    id: "season-longan",
    type: "season",
    kh: "មៀន",
    en: "Longan",
    farmer: "Pailin Mango Group",
    province: "Pailin",
    price: "650 - 800៛/kg target",
    quantity: "Harvest 2026-08",
    badge: "Pre-order",
    cta: "Pre-order",
    image: "https://images.unsplash.com/photo-1615485500834-bc10199bc727?auto=format&fit=crop&w=900&q=80",
    keywords: ["season", "pre-order", "crop", "longan", "pailin", "upcoming harvest"],
  },
  {
    id: "season-banana",
    type: "season",
    kh: "ចេកអំបូង",
    en: "Namwa Banana",
    farmer: "Kampong Cham Growers",
    province: "Kampong Cham",
    price: "700 - 900៛/kg target",
    quantity: "Harvest 2026-07",
    badge: "Upcoming",
    cta: "Pre-order",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80",
    keywords: ["season", "pre-order", "banana", "kampong cham", "upcoming harvest"],
  },
  {
    id: "deal-mango",
    type: "deal",
    kh: "ស្វាយកែវរមៀត",
    en: "Keo Romeat Mango Deal",
    farmer: "Lina Organic Farm",
    province: "Kampong Speu",
    price: "500៛/kg",
    quantity: "60 kg deal stock",
    badge: "Save 29%",
    cta: "Claim Deal",
    image: "https://images.unsplash.com/photo-1624301939259-56d3962883f5?auto=format&fit=crop&w=900&q=80",
    keywords: ["deal", "mango", "discount", "good price", "fresh", "kampong speu"],
  },
  {
    id: "deal-tomato",
    type: "deal",
    kh: "ប៉េងប៉ោះ",
    en: "Tomato Deal",
    farmer: "Sreyleak Farm",
    province: "Takeo",
    price: "650៛/kg",
    quantity: "30 kg deal stock",
    badge: "Save 25%",
    cta: "Claim Deal",
    image: "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=900&q=80",
    keywords: ["deal", "tomato", "discount", "good price", "fresh", "takeo"],
  },
  {
    id: "farmer-sokchan",
    type: "farmer",
    kh: "សុខ ចាន់",
    en: "Sok Chan Farm",
    farmer: "Verified Farmer",
    province: "Kampong Speu",
    price: "Mango from 500៛/kg",
    quantity: "Mango, banana, longan",
    badge: "Verified",
    cta: "View Profile",
    image: "https://images.unsplash.com/photo-1595351298020-038700609878?auto=format&fit=crop&w=900&q=80",
    keywords: ["farmer", "profile", "sok chan", "mango", "kampong speu", "verified"],
  },
  {
    id: "farmer-lina",
    type: "farmer",
    kh: "លីណា",
    en: "Lina Organic Farm",
    farmer: "Organic Supplier",
    province: "Kampong Speu",
    price: "Mango from 550៛/kg",
    quantity: "Mango, coconut, herbs",
    badge: "Organic",
    cta: "View Profile",
    image: "https://images.unsplash.com/photo-1520052205864-92d242b3a76b?auto=format&fit=crop&w=900&q=80",
    keywords: ["farmer", "profile", "lina", "organic", "kampong speu", "fresh products"],
  },
];

function typeLabel(type) {
  return {
    fresh: "Fresh product",
    wholesale: "Wholesale supply",
    season: "Season / Pre-order",
    deal: "Deal",
    farmer: "Farmer",
  }[type];
}

function getSearchParam() {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  return params.get("q") || "";
}

function itemMatchesQuery(item, query) {
  if (!query.trim()) return true;
  const text = [item.kh, item.en, item.farmer, item.province, item.price, item.quantity, item.badge, ...item.keywords]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((part) => text.includes(part));
}

export default function SearchPage() {
  const [query, setQuery] = useState(getSearchParam);
  const [submittedQuery, setSubmittedQuery] = useState(getSearchParam);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [modalItem, setModalItem] = useState(null);
  const [recent, setRecent] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("phsar-srae-recent-searches")) || ["mango", "tomato", "coconut"];
    } catch {
      return ["mango", "tomato", "coconut"];
    }
  });

  useEffect(() => {
    const onHash = () => {
      const next = getSearchParam();
      setQuery(next);
      setSubmittedQuery(next);
      setLoading(true);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 420);
    return () => window.clearTimeout(timer);
  }, [submittedQuery, activeFilter]);

  useEffect(() => {
    if (!submittedQuery.trim()) return;
    const nextRecent = [submittedQuery.trim(), ...recent.filter((item) => item !== submittedQuery.trim())].slice(0, 5);
    setRecent(nextRecent);
    localStorage.setItem("phsar-srae-recent-searches", JSON.stringify(nextRecent));
  }, [submittedQuery]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const results = useMemo(() => {
    return searchItems.filter((item) => {
      const matchesFilter = activeFilter === "all" || item.type === activeFilter;
      return matchesFilter && itemMatchesQuery(item, submittedQuery);
    });
  }, [activeFilter, submittedQuery]);

  const groupedResults = useMemo(() => {
    return filters
      .filter((filter) => filter.key !== "all")
      .map((filter) => ({
        ...filter,
        items: results.filter((item) => item.type === filter.key),
      }))
      .filter((group) => group.items.length);
  }, [results]);

  function runSearch(nextQuery = query) {
    const cleanQuery = nextQuery.trim();
    setSubmittedQuery(cleanQuery);
    setQuery(cleanQuery);
    window.history.replaceState(null, "", cleanQuery ? `#/search?q=${encodeURIComponent(cleanQuery)}` : "#/search");
  }

  function handleAction(item) {
    if (item.type === "fresh") {
      setToast(`${item.en} added to cart`);
      return;
    }

    if (item.type === "deal") {
      setToast(`${item.en} deal claimed at ${item.price}`);
      return;
    }

    setModalItem(item);
  }

  function modalTitle(item) {
    if (!item) return "";
    return {
      wholesale: "Make wholesale offer",
      season: "Create pre-order request",
      farmer: "Farmer profile",
    }[item.type];
  }

  return (
    <main className="search-page">
      <aside className="search-sidebar" aria-label="Search tools">
        <form
          className="search-panel search-box-panel"
          onSubmit={(event) => {
            event.preventDefault();
            runSearch();
          }}
        >
          <label htmlFor="search-page-input">Search</label>
          <div className="search-input-wrap">
            <span aria-hidden="true">⌕</span>
            <input
              id="search-page-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search crops, farmers, provinces..."
            />
          </div>
        </form>

        <section className="search-panel">
          <div className="search-panel-head">
            <h2>Recent searches</h2>
            <button type="button" onClick={() => setRecent([])}>Clear</button>
          </div>
          <div className="recent-list">
            {recent.length ? (
              recent.map((item) => (
                <button type="button" key={item} onClick={() => runSearch(item)}>
                  <span aria-hidden="true">↺</span>
                  {item}
                </button>
              ))
            ) : (
              <p>No recent searches yet.</p>
            )}
          </div>
        </section>

        <section className="search-panel">
          <h2>Popular searches</h2>
          <div className="popular-list">
            {popularSearches.map((item) => (
              <button type="button" key={item} onClick={() => runSearch(item)}>{item}</button>
            ))}
          </div>
        </section>
      </aside>

      <section className="search-results-area" aria-live="polite">
        <div className="search-topline">
          <div>
            <p className="search-kicker">Search marketplace</p>
            <h1>{submittedQuery ? `Search results for "${submittedQuery}"` : "Search Phsar Srae"}</h1>
            <span>{loading ? "Finding matching crops and farmers..." : `${results.length} result${results.length === 1 ? "" : "s"} found`}</span>
          </div>
        </div>

        <div className="search-filter-row" aria-label="Search filters">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.key}
              className={activeFilter === filter.key ? "is-active" : ""}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {!submittedQuery && !loading ? (
          <div className="search-state-card">
            <strong>Start with a crop, farmer, province, or buying need.</strong>
            <p>Try mango, coconut, wholesale supply, Kampong Speu, season crops, or deals.</p>
          </div>
        ) : null}

        {loading ? (
          <div className="result-grid loading-grid" aria-label="Loading search results">
            {[1, 2, 3, 4].map((item) => (
              <div className="result-card is-loading" key={item}>
                <span />
                <div />
                <div />
                <div />
              </div>
            ))}
          </div>
        ) : results.length ? (
          <div className="search-groups">
            {groupedResults.map((group) => (
              <section className="result-group" key={group.key}>
                <div className="result-group-head">
                  <div>
                    <h2>{group.label === "Season" ? "Season / Pre-order" : group.label}</h2>
                    <p>{group.items.length} matching {group.items.length === 1 ? "result" : "results"}</p>
                  </div>
                </div>
                <div className="result-grid">
                  {group.items.map((item) => (
                    <article className={`result-card result-${item.type}`} key={item.id}>
                      <div className="result-image">
                        <img src={item.image} alt={`${item.en} from ${item.province}`} />
                        <span>{item.badge}</span>
                      </div>
                      <div className="result-body">
                        <div className="result-type-row">
                          <span>{typeLabel(item.type)}</span>
                        </div>
                        <h3>{item.kh}</h3>
                        <p className="result-en">{item.en}</p>
                        <dl>
                          <div>
                            <dt>{item.type === "farmer" ? "Status" : "Farmer / supplier"}</dt>
                            <dd>{item.farmer}</dd>
                          </div>
                          <div>
                            <dt>Province</dt>
                            <dd>{item.province}</dd>
                          </div>
                          <div>
                            <dt>Price</dt>
                            <dd>{item.price}</dd>
                          </div>
                          <div>
                            <dt>Available</dt>
                            <dd>{item.quantity}</dd>
                          </div>
                        </dl>
                        <button type="button" className={`result-cta cta-${item.type}`} onClick={() => handleAction(item)}>
                          {item.cta}
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="search-state-card no-results">
            <strong>No results found</strong>
            <p>Try another crop, farmer name, province, or switch back to All.</p>
            <button type="button" onClick={() => runSearch("")}>Clear search</button>
          </div>
        )}
      </section>

      {toast ? <div className="search-toast" role="status">{toast}</div> : null}

      {modalItem ? (
        <div className="search-modal-backdrop" role="presentation" onClick={() => setModalItem(null)}>
          <section className="search-modal" role="dialog" aria-modal="true" aria-label={modalTitle(modalItem)} onClick={(event) => event.stopPropagation()}>
            <button type="button" className="modal-close" aria-label="Close" onClick={() => setModalItem(null)}>×</button>
            <img src={modalItem.image} alt="" />
            <span>{modalItem.badge}</span>
            <h2>{modalTitle(modalItem)}</h2>
            <h3>{modalItem.kh}</h3>
            <p>{modalItem.en} · {modalItem.farmer} · {modalItem.province}</p>
            <dl>
              <div>
                <dt>Price</dt>
                <dd>{modalItem.price}</dd>
              </div>
              <div>
                <dt>Available</dt>
                <dd>{modalItem.quantity}</dd>
              </div>
            </dl>
            {modalItem.type === "farmer" ? (
              <p className="modal-note">Profile flow opened. Buyer can review farm crops, province, quality badge, and contact the farmer.</p>
            ) : (
              <form className="modal-form">
                <label>
                  Quantity request
                  <input type="text" placeholder={modalItem.type === "wholesale" ? "Example: 1,000 kg" : "Example: 200 kg for harvest month"} />
                </label>
                <label>
                  Buyer note
                  <textarea placeholder="Add delivery, price, or timing details" />
                </label>
              </form>
            )}
            <button
              type="button"
              className="result-cta"
              onClick={() => {
                setToast(
                  modalItem.type === "farmer"
                    ? `${modalItem.en} profile viewed`
                    : `${modalItem.cta} request sent for ${modalItem.en}`
                );
                setModalItem(null);
              }}
            >
              {modalItem.type === "farmer" ? "Done" : `Send ${modalItem.cta}`}
            </button>
          </section>
        </div>
      ) : null}
    </main>
  );
}
