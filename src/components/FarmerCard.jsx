function FarmerAvatar({ tone }) {
  return (
    <svg className="farmer-avatar" viewBox="0 0 120 120" role="img" aria-label="Farmer portrait">
      <defs>
        <linearGradient id={`fg-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff7e6" />
          <stop offset="1" stopColor={tone} />
        </linearGradient>
      </defs>
      <rect width="120" height="120" fill={`url(#fg-${tone})`} />
      <circle cx="92" cy="26" r="16" fill="#ffd98a" opacity="0.7" />
      {/* shoulders + body */}
      <path d="M28 118 q4 -40 32 -44 q28 4 32 44z" fill="#2f6842" />
      {/* head */}
      <circle cx="60" cy="56" r="22" fill="#c98f63" />
      {/* hat */}
      <path d="M32 50 q28 -34 56 0 q-12 -10 -28 -10 q-16 0 -28 10z" fill="#e2b15a" />
      <path d="M30 50 h60 v4 h-60z" fill="#cf9a45" />
      {/* smile */}
      <path d="M52 62 q8 7 16 0" stroke="#7a4a30" strokeWidth="2.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function FarmerCard({ farmer }) {
  return (
    <article className="farmer-card">
      <div className="farmer-card-img" style={{ "--c": farmer.tone }}>
        <FarmerAvatar tone={farmer.tone} />
        <span className={`farmer-badge ${farmer.badgeType === "organic" ? "badge-organic" : "badge-grade"}`}>
          {farmer.badgeType === "organic" ? "🌿 Organic" : "★ Grade A"}
        </span>
      </div>

      <div className="farmer-card-body">
        <div className="farmer-name-row">
          <div className="farmer-name">
            <strong>{farmer.en}</strong>
            <small>{farmer.kh}</small>
          </div>
          <span className="rating"><span className="star">★</span>{farmer.rating}</span>
        </div>

        <span className="farmer-province">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.4" fill="currentColor" />
          </svg>
          {farmer.province}
        </span>

        <div className="farmer-meta">
          <div>
            <span>Available</span>
            <strong>{farmer.available}</strong>
          </div>
          <div>
            <span>Price</span>
            <strong className="farmer-price">{farmer.price}</strong>
          </div>
        </div>

        <div className="farmer-actions">
          <a className="button button-primary" href="#upcoming">Order Now</a>
          <a className="button button-secondary" href="#upcoming">View</a>
        </div>
      </div>
    </article>
  );
}
