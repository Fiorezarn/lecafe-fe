import * as React from "react";
import Navbar from "@/components/navigation/Navbar";
import CardList from "@/components/menu/CardList";
import Footer from "@/components/navigation/Footer";
import BannerSwiper from "@/components/menu/Banner";

function Menu() {
  return (
    <>
      <Navbar />
      <BannerSwiper />
      <div className="px-10 lg:px-28 py-10 bg-earth3">
        <CardList />
      </div>
      <Footer />
    </>
  );
}

export default Menu;
