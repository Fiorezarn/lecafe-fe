import * as React from "react";
import Navbar from "@/components/navigation/Navbar";
import CardList from "@/components/menu/CardList";
import Footer from "@/components/navigation/Footer";
import BannerSwiper from "@/components/menu/Banner";
import { Separator } from "@/components/ui/separator";
import { FaTruck } from "react-icons/fa6";
import { HiBuildingStorefront } from "react-icons/hi2";

function Menu() {
  return (
    <>
      <Navbar />
      <BannerSwiper />
      <div className="px-6 lg:px-28 py-5 bg-earth3">
        <div className="flex md:flex-row flex-col rounded-full border-dashed border-2 border-earth justify-center items-center text-earth text-sm lg:text-lg py-2 px-4 space-x-4">
          <h1 className="font-semibold font-mono md:text-xl">
            TYPE OF SERVICES AVAILABLE
          </h1>
          <Separator
            className="md:h-6 h-px md:w-px bg-earth"
            aria-hidden="true"
          />
          <div className="flex items-center space-x-4">
            <span className="text-earth">
              <HiBuildingStorefront />
            </span>
            <h1 className="font-semibold font-sour">Dine-in</h1>
            <span className="text-earth">
              <FaTruck />
            </span>
            <h1 className="font-semibold font-sour">Delivery</h1>
          </div>
        </div>
      </div>

      <div className="px-10 lg:px-28 py-10 bg-earth3">
        <CardList />
      </div>
      <Footer />
    </>
  );
}

export default Menu;
