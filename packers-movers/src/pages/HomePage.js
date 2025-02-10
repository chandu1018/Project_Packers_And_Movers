import HeroCarousel from "../components/HeroCarousel";
import WhoWeAre from "../components/WhoWeAre";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import Headerh from "../components/Headerh";

export default function HomePage() {
  return (
    <div className="home_page">
      <Headerh />
      <HeroCarousel />
      <WhoWeAre />
      <WhyChooseUs />
      <Footer />
    </div>
  );
}
