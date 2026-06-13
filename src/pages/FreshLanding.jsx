import HeroSection from "../components/HeroSection.jsx";
import ProblemScrollSection from "../components/ProblemScrollSection.jsx";
import FarmZoneMapSection from "../components/FarmZoneMapSection.jsx";
import FooterSection from "../components/FooterSection.jsx";

// The original storytelling landing — reachable as the "Fresh" page (#/fresh).
export default function FreshLanding() {
  return (
    <>
      <HeroSection />
      <ProblemScrollSection />
      <FarmZoneMapSection />
      <FooterSection />
    </>
  );
}
