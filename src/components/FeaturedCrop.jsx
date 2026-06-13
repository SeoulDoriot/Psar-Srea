import { Reveal } from "../hooks/useReveal.js";
import FarmerCard from "./FarmerCard.jsx";

const farmers = [
  { en: "Sok Chan Farm", kh: "សុខ ចាន់", province: "Kampong Speu", available: "1,200 kg", price: "500៛/kg", rating: "4.8", badgeType: "grade", tone: "#bfe0a8" },
  { en: "Lina Organic Farm", kh: "លីណា", province: "Kampong Speu", available: "850 kg", price: "550៛/kg", rating: "4.9", badgeType: "organic", tone: "#a9d98c" },
  { en: "Bun Roth Farm", kh: "ប៊ុន រ័ត្ន", province: "Kampong Speu", available: "600 kg", price: "600៛/kg", rating: "4.7", badgeType: "grade", tone: "#cfe6b0" },
  { en: "Maly Farm", kh: "ម៉ាលី", province: "Kampong Speu", available: "1,000 kg", price: "500៛/kg", rating: "4.6", badgeType: "organic", tone: "#b6dd96" },
  { en: "Chhun Vireak Farm", kh: "ឈុន វីរៈ", province: "Kampong Speu", available: "700 kg", price: "550៛/kg", rating: "4.8", badgeType: "grade", tone: "#c6e3a4" },
];

export default function FeaturedCrop() {
  return (
    <section className="market-section featured-section" id="featured">
      <Reveal className="section-head">
        <div className="section-head-text">
          <p className="section-kicker"><span className="kicker-dot" /> Featured crop</p>
          <div className="featured-title-row">
            <h2>Keo Romeat Mango</h2>
            <span className="fair-price-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Fair price 500៛–700៛/kg
            </span>
          </div>
          <p>Order directly from verified farmers growing this crop in Kampong Speu.</p>
        </div>
        <a className="see-all" href="#featured">
          See all
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </Reveal>

      <div className="card-rail" role="list">
        {farmers.map((farmer) => (
          <div role="listitem" key={farmer.en}>
            <FarmerCard farmer={farmer} />
          </div>
        ))}
      </div>
    </section>
  );
}
