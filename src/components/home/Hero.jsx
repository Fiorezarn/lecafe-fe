import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

function Hero() {
  const { cookie } = useSelector((state) => state.auth);
  return (
    <section
      className="relative h-screen w-full bg-cover bg-center group"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730861592/hero_ne5kko.jpg")`,
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
  );
}

export default Hero;
