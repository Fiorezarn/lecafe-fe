import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import Testimoni from "@/components/home/Testimoni";
import AboutUs from "@/components/home/AboutUs";
import Subcribe from "@/components/home/Subcribe";
import SpecialMenu from "@/components/home/SpecialMenu";
import Hero from "@/components/home/Hero";
import Divide from "@/components/home/Divide";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SpecialMenu />
      <Divide />
      <Testimoni />
      <AboutUs />
      <Subcribe />
      <Footer />
    </>
  );
}

export default Home;
