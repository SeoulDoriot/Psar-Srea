import { useState } from "react";
import { Reveal } from "../hooks/useReveal.js";
import { CAMBODIA_VIEWBOX, PROVINCE_GEO, TONLE_SAP, RIVERS } from "./cambodiaProvinces.js";

// viewBox dimensions, kept in sync with the generated data module.
const VB_W = 1000;
const VB_H = 924;

const categories = [
  { key: "vegetables", label: "Vegetables", cls: "cat-green", icon: "V" },
  { key: "fruits", label: "Fruits", cls: "cat-orange", icon: "F" },
  { key: "rice", label: "Rice", cls: "cat-gold", icon: "R" },
  { key: "cassava", label: "Cassava / Corn", cls: "cat-brown", icon: "C" },
  { key: "surplus", label: "Surplus", cls: "cat-red", icon: "S" },
];

const provinceCropData = {
  "Banteay Meanchey": {
    category: "rice",
    categoryLabel: "Rice / Vegetables",
    popularCrops: ["Rice", "Cassava", "Mung Bean"],
    supply: "7,400 kg",
    farmers: 13,
    harvest: "October–January",
    price: "500–950 riel/kg",
    verified: "Banteay Meanchey Farmer Network",
    x: 21.1,
    y: 27.9,
  },
  Battambang: {
    category: "rice",
    categoryLabel: "Rice / Cassava",
    popularCrops: ["Rice", "Cassava", "Mango", "Corn"],
    supply: "12,000 kg",
    farmers: 18,
    harvest: "July–October",
    price: "500–900 riel/kg",
    verified: "Battambang Farmers Union",
    x: 24.2,
    y: 39.2,
  },
  "Kampong Cham": {
    category: "cassava",
    categoryLabel: "Cassava / Corn",
    popularCrops: ["Cassava", "Rubber", "Corn", "Soybean"],
    supply: "10,500 kg",
    farmers: 20,
    harvest: "November–February",
    price: "400–850 riel/kg",
    verified: "Kampong Cham Crop Co-op",
    x: 57.1,
    y: 61.2,
  },
  "Kampong Chhnang": {
    category: "rice",
    categoryLabel: "Rice / Vegetables",
    popularCrops: ["Rice", "Vegetables", "Lotus Root"],
    supply: "5,900 kg",
    farmers: 12,
    harvest: "September–December",
    price: "500–1,050 riel/kg",
    verified: "Kampong Chhnang Growers",
    x: 45.7,
    y: 56.2,
  },
  "Kampong Speu": {
    category: "fruits",
    categoryLabel: "Fruits",
    popularCrops: ["Mango", "Banana", "Longan"],
    supply: "8,500 kg",
    farmers: 12,
    harvest: "12–20 July 2025",
    price: "1,800–2,200 riel/kg",
    verified: "Kampong Speu Co-op",
    x: 43.5,
    y: 72.1,
  },
  "Kampong Thom": {
    category: "rice",
    categoryLabel: "Rice / Cassava",
    popularCrops: ["Rice", "Cassava", "Cashew"],
    supply: "9,800 kg",
    farmers: 16,
    harvest: "August–December",
    price: "500–1,000 riel/kg",
    verified: "Kampong Thom Rice Federation",
    x: 48.9,
    y: 47,
  },
  Kampot: {
    category: "fruits",
    categoryLabel: "Fruits / Specialty",
    popularCrops: ["Pepper", "Durian", "Rice"],
    supply: "4,300 kg",
    farmers: 9,
    harvest: "Seasonal",
    price: "1,200–3,500 riel/kg",
    verified: "Kampot Pepper Association",
    x: 38.5,
    y: 88.9,
  },
  Kandal: {
    category: "vegetables",
    categoryLabel: "Vegetables",
    popularCrops: ["Leafy Greens", "Cucumber", "Rice"],
    supply: "6,900 kg",
    farmers: 14,
    harvest: "Ready now",
    price: "700–1,300 riel/kg",
    verified: "Kandal Vegetable Co-op",
    x: 49.8,
    y: 71.5,
  },
  Kep: {
    category: "fruits",
    categoryLabel: "Fruits / Specialty",
    popularCrops: ["Pepper", "Coconut", "Durian"],
    supply: "2,800 kg",
    farmers: 6,
    harvest: "Seasonal",
    price: "1,200–3,200 riel/kg",
    verified: "Kep Coastal Growers",
    x: 40.5,
    y: 91.5,
  },
  "Koh Kong": {
    category: "vegetables",
    categoryLabel: "Vegetables",
    popularCrops: ["Morning Glory", "Cucumber", "Chili"],
    supply: "5,100 kg",
    farmers: 11,
    harvest: "Ready now",
    price: "800–1,400 riel/kg",
    verified: "Koh Kong Green Co-op",
    x: 21.3,
    y: 68.8,
  },
  Kratie: {
    category: "cassava",
    categoryLabel: "Cassava / Corn",
    popularCrops: ["Cassava", "Corn", "Soybean"],
    supply: "8,900 kg",
    farmers: 17,
    harvest: "December–February",
    price: "450–850 riel/kg",
    verified: "Kratie Agri-Industry Co-op",
    x: 65.5,
    y: 51.6,
  },
  Mondulkiri: {
    category: "fruits",
    categoryLabel: "Fruits / Cassava",
    popularCrops: ["Avocado", "Coffee", "Cassava"],
    supply: "3,800 kg",
    farmers: 8,
    harvest: "Seasonal",
    price: "1,000–3,000 riel/kg",
    verified: "Mondulkiri Highland Co-op",
    x: 82.6,
    y: 52.2,
  },
  "Oddar Meanchey": {
    category: "cassava",
    categoryLabel: "Cassava / Corn",
    popularCrops: ["Cassava", "Corn", "Rice"],
    supply: "7,100 kg",
    farmers: 12,
    harvest: "November–February",
    price: "450–900 riel/kg",
    verified: "Oddar Meanchey Farmer Group",
    x: 28.6,
    y: 18.3,
  },
  Pailin: {
    category: "fruits",
    categoryLabel: "Fruits",
    popularCrops: ["Longan", "Mango", "Corn"],
    supply: "3,200 kg",
    farmers: 7,
    harvest: "July–September",
    price: "1,000–2,200 riel/kg",
    verified: "Pailin Orchard Group",
    x: 15.6,
    y: 44.2,
  },
  "Preah Sihanouk": {
    category: "fruits",
    categoryLabel: "Fruits / Vegetables",
    popularCrops: ["Coconut", "Banana", "Vegetables"],
    supply: "4,900 kg",
    farmers: 10,
    harvest: "Seasonal",
    price: "900–2,100 riel/kg",
    verified: "Preah Sihanouk Coastal Co-op",
    x: 28.9,
    y: 88.7,
  },
  "Preah Vihear": {
    category: "rice",
    categoryLabel: "Rice / Cassava",
    popularCrops: ["Rice", "Cassava", "Cashew"],
    supply: "8,200 kg",
    farmers: 14,
    harvest: "August–December",
    price: "500–1,000 riel/kg",
    verified: "Preah Vihear Growers",
    x: 50.3,
    y: 25.5,
  },
  "Prey Veng": {
    category: "rice",
    categoryLabel: "Rice",
    popularCrops: ["Rice", "Vegetables"],
    supply: "11,400 kg",
    farmers: 22,
    harvest: "November–January",
    price: "450–800 riel/kg",
    verified: "Prey Veng Rice Co-op",
    x: 55.2,
    y: 71.5,
  },
  Pursat: {
    category: "rice",
    categoryLabel: "Rice / Cassava",
    popularCrops: ["Rice", "Cassava", "Mango"],
    supply: "7,800 kg",
    farmers: 13,
    harvest: "September–December",
    price: "500–950 riel/kg",
    verified: "Pursat Crop Network",
    x: 34.7,
    y: 50.4,
  },
  Ratanakiri: {
    category: "fruits",
    categoryLabel: "Fruits / Cassava",
    popularCrops: ["Cashew", "Banana", "Cassava"],
    supply: "6,700 kg",
    farmers: 11,
    harvest: "Seasonal",
    price: "700–2,000 riel/kg",
    verified: "Ratanakiri Highland Co-op",
    x: 79.7,
    y: 26.5,
  },
  "Siem Reap": {
    category: "rice",
    categoryLabel: "Rice",
    popularCrops: ["Rice", "Cassava", "Vegetables"],
    supply: "10,200 kg",
    farmers: 18,
    harvest: "October–December",
    price: "500–950 riel/kg",
    verified: "Siem Reap Rice Co-op",
    x: 33.9,
    y: 34,
  },
  "Stung Treng": {
    category: "vegetables",
    categoryLabel: "Vegetables / Fruits",
    popularCrops: ["Pumpkin", "Long Bean", "Banana"],
    supply: "3,900 kg",
    farmers: 9,
    harvest: "Seasonal",
    price: "800–1,600 riel/kg",
    verified: "Stung Treng Co-op",
    x: 65.5,
    y: 30.9,
  },
  "Svay Rieng": {
    category: "surplus",
    categoryLabel: "Rice / Vegetables",
    popularCrops: ["Rice", "Cassava", "Vegetables"],
    supply: "5,600 kg",
    farmers: 10,
    harvest: "Ready now",
    price: "500–950 riel/kg",
    verified: "Svay Rieng Co-op",
    x: 64.8,
    y: 79.5,
    surplus: true,
  },
  Takeo: {
    category: "vegetables",
    categoryLabel: "Vegetables",
    popularCrops: ["Tomato", "Cucumber", "Morning Glory", "Rice"],
    supply: "6,200 kg",
    farmers: 15,
    harvest: "Ready now",
    price: "700–1,200 riel/kg",
    verified: "Takeo Agri Co-op",
    x: 47.6,
    y: 81.3,
  },
  "Tbong Khmum": {
    category: "cassava",
    categoryLabel: "Cassava / Corn",
    popularCrops: ["Cassava", "Rubber", "Corn"],
    supply: "8,400 kg",
    farmers: 15,
    harvest: "November–February",
    price: "420–850 riel/kg",
    verified: "Tbong Khmum Crop Co-op",
    x: 60.1,
    y: 63.4,
  },
};

const buyerHub = {
  id: "phnom-penh",
  type: "buyer",
  title: "Buyer Hub",
  province: "Phnom Penh",
  x: 49.5,
  y: 69.9,
  details: [
    "Factories and wholesalers",
    "Restaurants and hotels",
    "Export companies",
    "High demand for fresh produce",
  ],
};

const categoryClass = (key) => categories.find((category) => category.key === key)?.cls || "cat-green";
const categoryIcon = (key) => categories.find((category) => category.key === key)?.icon || "Z";

const provincePins = Object.entries(provinceCropData).map(([province, data]) => ({
  id: province.toLowerCase().replaceAll(" ", "-"),
  province,
  ...data,
}));

// Pin position = pole of inaccessibility (the point furthest inside the province's
// land), so even wrap-around shapes like Kandal get a pin on their own territory.
// Expressed as a % of the map frame, which shares the SVG viewBox coordinate space.
function pinPos(pin) {
  const geo = PROVINCE_GEO[pin.province];
  if (geo) return { x: (geo.px / VB_W) * 100, y: (geo.py / VB_H) * 100 };
  return { x: pin.x, y: pin.y };
}

// Pin diameter scales with the province's inscribed-circle radius so tiny provinces
// (Kep, Pailin) get small pins that fit on their land, big ones get larger pins.
function pinSize(pin) {
  if (pin.type === "buyer") return 42; // keep the buyer hub prominent
  const r = PROVINCE_GEO[pin.province]?.r ?? 30;
  return Math.round(Math.max(20, Math.min(38, 15 + r * 0.32)));
}

const allPins = [...provincePins, buyerHub];

export default function FarmZoneMapSection() {
  const [selectedId, setSelectedId] = useState("kampong-speu");
  const [filter, setFilter] = useState(null);

  const selected = allPins.find((pin) => pin.id === selectedId) || provincePins[0];

  return (
    <section className="farm-zone-section page-section" id="farm-zone-map">
      <Reveal className="farm-zone-card">
        <div className="farm-zone-top">
          <div className="section-heading align-left">
            <div className="farm-zone-kicker-row">
              <p className="section-kicker">
                <span className="kicker-dot" /> Farm Zone Map
              </p>
              <span className="cambodia-flag-badge" aria-label="Cambodia supply map">
                <span className="flag-mark" aria-hidden="true" />
                Cambodia supply
              </span>
            </div>
            <h2>
              Find supply by <span className="hero-headline-accent">farm zone</span>
            </h2>
            <p>Click a province pin to see popular crops, farmers, and supply details.</p>
          </div>

          <div className="crop-chips" aria-label="Crop categories">
            {categories.map((chip) => (
              <button
                type="button"
                key={chip.key}
                className={`chip ${chip.cls} ${filter === chip.key ? "is-active" : ""}`}
                onClick={() => setFilter((current) => (current === chip.key ? null : chip.key))}
              >
                <span className="chip-dot" />
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <div className="farm-zone-layout">
          <div className="zone-map" aria-label="Cambodia province supply map">
            <div className="map-frame">
              <CambodiaMap selectedId={selectedId} filter={filter} onSelect={setSelectedId} />

              {allPins.map((pin) => {
                const isBuyer = pin.type === "buyer";
                const { x, y } = pinPos(pin);
                const isSelected = selected?.id === pin.id;
                return (
                  <span
                    key={`${pin.id}-label`}
                    className={`province-label ${isBuyer ? "buyer-label" : ""} ${isSelected ? "is-active" : ""}`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    {isBuyer ? "Phnom Penh" : pin.province}
                  </span>
                );
              })}

              {allPins.map((pin) => {
                const isBuyer = pin.type === "buyer";
                const dimmed = filter && !isBuyer && pin.category !== filter;
                const isSelected = selected?.id === pin.id;
                const pinClass = isBuyer ? "buyer-hub-pin" : `pin ${categoryClass(pin.category)}`;
                const { x, y } = pinPos(pin);
                const size = pinSize(pin);

                return (
                  <button
                    key={pin.id}
                    type="button"
                    className={`map-pin ${pinClass} ${isSelected ? "is-selected" : ""} ${
                      dimmed ? "is-dimmed" : ""
                    }`}
                    style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
                    onClick={() => setSelectedId(pin.id)}
                    aria-label={isBuyer ? "Buyer Hub, Phnom Penh" : `${pin.province} farm zone`}
                  >
                    <span className="pin-glyph" style={{ fontSize: Math.max(8, Math.round(size * 0.36)) }}>
                      {isBuyer ? "Hub" : categoryIcon(pin.category)}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="map-live-badge">
              <span className="live-dot" /> Showing live supply
            </span>
          </div>

          <aside className="zone-detail-card" key={selected?.id} aria-live="polite">
            {selected?.type === "buyer" ? <BuyerCard hub={selected} /> : <ProvinceCard zone={selected} />}
          </aside>
        </div>

        <p className="farm-zone-note">Click a province to see popular crops and supply details.</p>
      </Reveal>
    </section>
  );
}

function ProvinceCard({ zone }) {
  return (
    <>
      <div className="zone-card-head">
        <span className={`zone-emoji ${categoryClass(zone.category)}`}>
          {categoryIcon(zone.category)}
        </span>
        <div>
          <span className="zone-eyebrow">Province farm zone</span>
          <h3>{zone.province}</h3>
          <span className={`verified-badge ${zone.surplus ? "is-surplus" : ""}`}>
            {zone.surplus ? "Surplus zone" : "Verified co-op zone"}
          </span>
        </div>
      </div>

      <span className={`category-badge ${categoryClass(zone.category)}`}>{zone.categoryLabel}</span>

      <p className="zone-crops-title">Popular crops</p>
      <ul className="popular-crop-list">
        {zone.popularCrops.map((crop) => (
          <li key={crop}>{crop}</li>
        ))}
      </ul>

      <ul className="zone-stats">
        <li>
          <span>Farmers available</span>
          <strong>{zone.farmers}</strong>
        </li>
        <li>
          <span>Estimated supply</span>
          <strong>{zone.supply}</strong>
        </li>
        <li>
          <span>Harvest window</span>
          <strong>{zone.harvest}</strong>
        </li>
        <li>
          <span>Fair price range</span>
          <strong>{zone.price}</strong>
        </li>
        <li>
          <span>Verified by</span>
          <strong>{zone.verified}</strong>
        </li>
      </ul>

      <div className="zone-actions">
        <a className="button button-primary" href="#market">
          View Farmers
        </a>
        <a className="button button-tonal" href="#market">
          Make Bulk Order
        </a>
        <a className="button button-secondary" href="#market">
          Pre-order Harvest
        </a>
      </div>
    </>
  );
}

function BuyerCard({ hub }) {
  return (
    <>
      <div className="zone-card-head">
        <span className="zone-emoji buyer-emoji">Hub</span>
        <div>
          <span className="zone-eyebrow">{hub.title}</span>
          <h3>{hub.province}</h3>
          <span className="verified-badge is-buyer">Demand center</span>
        </div>
      </div>

      <ul className="buyer-points">
        {hub.details.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <div className="zone-actions">
        <a className="button button-primary" href="#market">
          View Buyer Demand
        </a>
        <a className="button button-tonal" href="#for-farmers">
          Match Farmers
        </a>
      </div>
    </>
  );
}

function CambodiaMap({ selectedId, filter, onSelect }) {
  return (
    <svg
      className="cambodia-map"
      viewBox={CAMBODIA_VIEWBOX}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Map of Cambodia provinces"
    >
      {Object.entries(PROVINCE_GEO).map(([name, geo]) => {
        const isBuyer = name === "Phnom Penh";
        const data = provinceCropData[name];
        const id = name.toLowerCase().replaceAll(" ", "-");
        const dimmed = filter && !isBuyer && data?.category !== filter;
        const cls = [
          "zone-prov",
          isBuyer ? "is-buyer" : categoryClass(data?.category),
          selectedId === id ? "is-active" : "",
          dimmed ? "is-dimmed" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <path
            key={name}
            d={geo.d}
            className={cls}
            onClick={() => onSelect(id)}
          />
        );
      })}

      {/* Tonle Sap lake + Mekong / Tonle Sap / Bassac rivers — Cambodia's water
          signature, drawn on top of the land and non-interactive. */}
      {TONLE_SAP && <path className="tonle-sap" d={TONLE_SAP} />}
      {RIVERS.map((river, idx) => (
        <path key={idx} className={`river ${river.major ? "is-major" : ""}`} d={river.d} />
      ))}
    </svg>
  );
}
