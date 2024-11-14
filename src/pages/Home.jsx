import heroImage from "../assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import Footer from "@/components/navigation/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "@/components/navigation/Navbar";
import CardRecommended from "@/components/menu/CardRecommended";
import Testimoni from "@/components/home/Testimoni";

function Home() {
  const dispatch = useDispatch();
  const { cookie } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({ type: "menu/getAllMenu" });
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <section
        className="relative h-screen w-full bg-cover bg-center group"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        }}
      >
        <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center group">
          <h1 className="font-semibold font-sour text-3xl md:text-5xl lg:text-7xl text-white drop-shadow-lg cursor-pointer">
            Welcome to Le Café {cookie?.us_username}!
          </h1>

          <p className="text-white mt-4 text-sm lg:text-lg font-mono">
            We have the best coffee in town!
          </p>

          <Button className="mt-4 font-mono font-bold bg-earth3 text-black hover:text-white px-4 py-2">
            Order Now
          </Button>
        </div>
      </section>

      <section className="bg-[#F6EEE8] p-10">
        <h1 className="text-3xl font-mono text-center font-bold text-[#83704d]">
          OUR SPECIAL MENU
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
          <CardRecommended />
        </div>
      </section>
      <section className="bg-earth1 flex justify-between items-center p-6 lg:p-12">
        <img
          className="w-[20%] mb-4 lg:mb-0"
          src="https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730861879/flyingCoffee_gwkbg6.png"
          alt="Flying Coffee"
        />
        <div className="text-center mx-4 lg:mx-0 w-full max-w-3xl">
          <h1 className="md:text-xl font-mono lg:text-3xl font-bold text-earth4">
            Check out our best coffee beans here
          </h1>
        </div>
        <img
          className="w-[20%] mt-4 lg:mt-0"
          src="https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730861588/coffee-bean_exnpsc.png"
          alt="Coffee Beans"
        />
      </section>

      <section className="bg-[#F6EEE8]">
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <p className="text-center font-sour text-2xl md:text-3xl ">
            Come and Join
          </p>
          <h2 className="text-center font-mono text-3xl md:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="mt-10">
            <Testimoni />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
