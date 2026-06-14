export default function CropCard({ crop, mode = "upcoming" }) {
  const isInStock = mode === "inStock";

  return (
    <article className={`crop-card ${isInStock ? "is-in-stock" : "is-upcoming"}`}>
      <div className="crop-card-img" style={{ "--c1": crop.c1, "--c2": crop.c2 }}>
        <span className="crop-emoji" aria-hidden="true">{crop.emoji}</span>
        <span className="harvest-pill">{isInStock ? "In stock now" : `Harvest ${crop.seasonLabel || crop.month}`}</span>
        <span className="stock-pill">{crop.available}</span>
      </div>
      <div className="crop-card-body">
        <span className="crop-status">{crop.popularity || crop.status}</span>
        <strong className="crop-kh">{crop.kh}</strong>
        <span className="crop-en">{crop.en}</span>
        <span className="crop-province">{crop.province}</span>
        <div className="crop-price">
          <span>{isInStock ? "Fair price" : "Target price"}</span>
          <strong>{crop.price}</strong>
        </div>
        <div className="crop-meta-row">
          <span>{crop.farmers} farmers</span>
          <span>{crop.seasonLabel || crop.month}</span>
        </div>
        <a className="crop-cta" href={isInStock ? "#/buy" : "#upcoming"}>
          {isInStock ? "Buy now" : "Pre-order"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </article>
  );
}
