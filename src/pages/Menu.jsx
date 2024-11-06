// Menu.js
"use client";
import * as React from "react";
import MenuList from "@/components/menu/CardList";
import { useSelector } from "react-redux";
import MenuDetail from "@/components/menu/CardDetail";
import Navbar from "@/components/navbar/Navbar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
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
      <Navbar navClass={"bg-earth border-gray-200 fixed w-full z-10"} />
      <div className="px-10 md:px-28 md:pt-24 pt-24 bg-earth3">
        <Carousel className="w-[100%] relative mb-8">
          <CarouselContent>
            {images.map((image) => {
              return (
                <img
                  key={image.id}
                  src={image.imgUrl}
                  alt="Beige Modern Cafe Banner"
                />
              );
            })}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none">
            &lt;
          </CarouselPrevious>

          <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none">
            &gt;
          </CarouselNext>
        </Carousel>

        <CardList />
      </div>
      <Footer />
    </>
  );
}

export default Menu;
