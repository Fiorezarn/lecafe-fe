import * as React from "react";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import CardList from "@/components/menu/CardList";
import Footer from "@/components/footer/Footer";

function Menu() {
  const images = [
    {
      id: 1,
      imgUrl:
        "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730865829/Beige_Modern_Cafe_Banner_t8pitc.png",
    },
    {
      id: 2,
      imgUrl:
        "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730865828/Beige_Brown_Abstract_Modern_Coffee_Shop_Banner_ct20fa.png",
    },
    {
      id: 3,
      imgUrl:
        "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730865638/Brown_Modern_Coffee_Shop_Opening_and_Closing_Hours_Banner_vkojd9.png",
    },
  ];

  return (
    <>
      <Navbar />
      <Carousel className="w-[100%]">
        <CarouselContent>
          {images.map((image) => (
            <img
              className="w-[400px] h-[500px]"
              key={image.id}
              src={image.imgUrl}
              alt="Beige Modern Cafe Banner"
            />
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none">
          &lt;
        </CarouselPrevious>

        <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none">
          &gt;
        </CarouselNext>
      </Carousel>

      <div className="px-10 lg:px-28 py-10 bg-earth3">
        <CardList />
      </div>
      <Footer />
    </>
  );
}

export default Menu;
