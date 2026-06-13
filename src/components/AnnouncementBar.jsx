const items = [
  "Fair prices from Cambodian farms",
  "Verified buyers",
  "Fresh supply updated daily",
];

export default function AnnouncementBar() {
  return (
    <div className="announce-bar">
      <div className="announce-inner">
        <span className="announce-live" aria-hidden="true" />
        {items.map((t, i) => (
          <span className="announce-item" key={t}>
            {t}
            {i < items.length - 1 && <span className="announce-sep" aria-hidden="true">•</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
