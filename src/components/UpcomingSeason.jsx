import { Reveal } from "../hooks/useReveal.js";
import CropCard from "./CropCard.jsx";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const fruitSeasonData = [
  {
    kh: "ស្វាយកែវរមៀត",
    en: "Keo Romeat Mango",
    emoji: "🥭",
    province: "Kampong Speu",
    seasonStart: 3,
    seasonEnd: 7,
    available: "8,500 kg",
    price: "1,800–2,200 riel/kg",
    farmers: 12,
    popularity: "Popular now",
    c1: "#fff0cf",
    c2: "#ffd98a",
  },
  {
    kh: "ដូងខ្ចី",
    en: "Young Coconut",
    emoji: "🥥",
    province: "Kandal",
    seasonStart: 5,
    seasonEnd: 8,
    available: "6,200 kg",
    price: "900–1,400 riel/kg",
    farmers: 14,
    popularity: "In stock",
    c1: "#e3f3df",
    c2: "#bfe0a8",
  },
  {
    kh: "ទុរេនកំពត",
    en: "Kampot Durian",
    emoji: "🍈",
    province: "Kampot",
    seasonStart: 5,
    seasonEnd: 7,
    available: "2,900 kg",
    price: "2,800–4,200 riel/kg",
    farmers: 8,
    popularity: "Premium demand",
    c1: "#f5edda",
    c2: "#d9c38f",
  },
  {
    kh: "ចេកអំបូង",
    en: "Namwa Banana",
    emoji: "🍌",
    province: "Battambang",
    seasonStart: 1,
    seasonEnd: 12,
    available: "11,300 kg",
    price: "700–1,100 riel/kg",
    farmers: 22,
    popularity: "Always moving",
    c1: "#fff7d7",
    c2: "#f1d46e",
  },
  {
    kh: "មៀន",
    en: "Longan",
    emoji: "🍈",
    province: "Battambang",
    seasonStart: 7,
    seasonEnd: 9,
    available: "3,800 kg",
    price: "1,500–2,300 riel/kg",
    farmers: 11,
    popularity: "Upcoming",
    c1: "#f6eddd",
    c2: "#e5cc9c",
  },
  {
    kh: "សាវម៉ាវ",
    en: "Rambutan",
    emoji: "🍒",
    province: "Ratanakiri",
    seasonStart: 7,
    seasonEnd: 8,
    available: "4,100 kg",
    price: "1,600–2,600 riel/kg",
    farmers: 10,
    popularity: "Pre-order",
    c1: "#ffe4e1",
    c2: "#f5a6a3",
  },
  {
    kh: "ស្រកានាគ",
    en: "Dragon Fruit",
    emoji: "🐉",
    province: "Kampong Cham",
    seasonStart: 7,
    seasonEnd: 10,
    available: "5,600 kg",
    price: "1,300–2,100 riel/kg",
    farmers: 16,
    popularity: "Upcoming",
    c1: "#ffe8ef",
    c2: "#f1a7c3",
  },
  {
    kh: "ម្នាស់",
    en: "Pineapple",
    emoji: "🍍",
    province: "Koh Kong",
    seasonStart: 8,
    seasonEnd: 11,
    available: "7,200 kg",
    price: "900–1,500 riel/kg",
    farmers: 13,
    popularity: "Pre-order",
    c1: "#fff0bd",
    c2: "#f0b95f",
  },
];

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

function isInSeason(crop, month) {
  if (crop.seasonStart <= crop.seasonEnd) {
    return month >= crop.seasonStart && month <= crop.seasonEnd;
  }

  return month >= crop.seasonStart || month <= crop.seasonEnd;
}

function monthsUntilStart(crop, month) {
  return (crop.seasonStart - month + 12) % 12;
}

function orderBySeasonTimeline(crops, month) {
  return [...crops].sort((a, b) => {
    const aInSeason = isInSeason(a, month);
    const bInSeason = isInSeason(b, month);

    if (aInSeason !== bInSeason) return aInSeason ? -1 : 1;
    if (aInSeason && bInSeason) return a.seasonEnd - b.seasonEnd;

    return monthsUntilStart(a, month) - monthsUntilStart(b, month);
  });
}

function seasonLabel(crop) {
  const start = monthNames[crop.seasonStart - 1].slice(0, 3);
  const end = monthNames[crop.seasonEnd - 1].slice(0, 3);
  return crop.seasonStart === crop.seasonEnd ? start : `${start}–${end}`;
}

export default function UpcomingSeason() {
  const cropsByTimeline = orderBySeasonTimeline(fruitSeasonData, currentMonth).map((crop) => {
    const inSeason = isInSeason(crop, currentMonth);

    return {
      ...crop,
      status: inSeason ? "During season" : "Upcoming",
      mode: inSeason ? "inStock" : "upcoming",
      seasonLabel: seasonLabel(crop),
    };
  });

  return (
    <section className="market-section season-timeline-section" id="upcoming">
      <Reveal className="section-head season-timeline-head">
        <div className="section-head-text">
          <p className="section-kicker">
            <span className="kicker-dot" /> ការបញ្ជាទិញរដូវកាល · Upcoming Season
          </p>
          <h2>Fruit season timeline</h2>
          <p>
            The row is ordered by season. Fruits in season for {monthNames[currentMonth - 1]} turn green;
            the next harvests continue to the right as upcoming pre-orders.
          </p>
        </div>
        <span className="season-date-pill">Today: {monthNames[currentMonth - 1]} {currentYear}</span>
      </Reveal>

      <div className="season-legend" aria-label="Season status legend">
        <span className="legend-current">During season / in stock</span>
        <span className="legend-upcoming">Upcoming season / pre-order</span>
      </div>

      <div className="card-rail season-timeline-rail" role="list">
        {cropsByTimeline.map((crop) => (
          <div role="listitem" key={crop.en}>
            <CropCard crop={crop} mode={crop.mode} />
          </div>
        ))}
      </div>
    </section>
  );
}
