import { useEffect, useState } from "react";
import { Reveal } from "../hooks/useReveal.js";

const promoSlides = [
  {
    eyebrow: "Farmer spotlight",
    title: "Kampong Speu mango harvest is ready.",
    body: "Verified farmers are listing fresh Keo Romeat mango for restaurants, hotels, and bulk buyers this week.",
    farmer: "Sok Chan Farm",
    province: "Kampong Speu",
    product: "Keo Romeat Mango",
    supply: "8,500 kg",
    price: "1,800–2,200 riel/kg",
    tone: "promo-mango",
    mediaLabel: "Farmer product video",
  },
  {
    eyebrow: "Buyer demand",
    title: "Hotels are ordering fresh coconut and banana.",
    body: "Phnom Penh buyer hub has active demand for fresh fruit supply from verified farm zones.",
    farmer: "Kandal Fruit Co-op",
    province: "Kandal",
    product: "Young Coconut",
    supply: "6,200 kg",
    price: "900–1,400 riel/kg",
    tone: "promo-coconut",
    mediaLabel: "Buyer demand ad",
  },
  {
    eyebrow: "Pre-order harvest",
    title: "Longan season opens next month.",
    body: "Factories and exporters can pre-order upcoming longan supply before harvest begins.",
    farmer: "Battambang Growers",
    province: "Battambang",
    product: "Longan",
    supply: "3,800 kg",
    price: "1,500–2,300 riel/kg",
    tone: "promo-longan",
    mediaLabel: "Upcoming crop ad",
  },
];

export default function MarketHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = promoSlides[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % promoSlides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="market-hero" id="top">
      <div className="market-hero-inner">
        <Reveal className="promo-slider">
          <div className="promo-copy" key={activeSlide.title}>
            <span className="promo-eyebrow">{activeSlide.eyebrow}</span>
            <h1>{activeSlide.title}</h1>
            <p>{activeSlide.body}</p>

            <div className="promo-actions">
              <a className="button button-primary" href="#seasonal-market">
                Browse fresh market
              </a>
              <a className="button button-secondary" href="#upcoming">
                Pre-order season
              </a>
            </div>

            <div className="promo-meta" aria-label="Featured supply details">
              <span>
                <strong>{activeSlide.supply}</strong>
                Available supply
              </span>
              <span>
                <strong>{activeSlide.price}</strong>
                Fair price range
              </span>
              <span>
                <strong>{activeSlide.province}</strong>
                Farm zone
              </span>
            </div>
          </div>

          <div className={`promo-media ${activeSlide.tone}`} aria-label={activeSlide.mediaLabel}>
            <div className="promo-video-frame">
              <span className="play-button" aria-hidden="true" />
              <div className="promo-produce-bowl" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="promo-farmer-card">
              <span>{activeSlide.farmer}</span>
              <strong>{activeSlide.product}</strong>
            </div>
          </div>

          <div className="promo-controls" aria-label="Promotional ads">
            {promoSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.title}
                className={index === activeIndex ? "is-active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${slide.product} promotion`}
              />
            ))}
            <span>{String(activeIndex + 1).padStart(2, "0")} / {String(promoSlides.length).padStart(2, "0")}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
