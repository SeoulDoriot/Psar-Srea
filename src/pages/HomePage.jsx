import MarketHero from "../components/MarketHero.jsx";
import UpcomingSeason from "../components/UpcomingSeason.jsx";
import FeaturedCrop from "../components/FeaturedCrop.jsx";
import FooterSection from "../components/FooterSection.jsx";

// Phsar Srae marketplace — reached from the Welcome entry page (#/market).
// The announcement bar + navbar are shared from App.
export default function HomePage() {
  return (
    <div className="home-page">
      <MarketHero />
      <UpcomingSeason />
      <FeaturedCrop />
      <FooterSection />
    </div>
  );
}
