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

function Menu() {
  return (
    <>
      <Navbar />
      <div className="px-10 md:px-28 py-10 md:py-20 bg-earth3">
        <Carousel className="w-full relative mb-8">
          <CarouselContent className="flex space-x-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-2 md:p-4">
                  <Card className="rounded-lg h-[50vh] shadow-lg overflow-hidden">
                    <CardContent className="flex items-center justify-center p-6 bg-white">
                      <span className="text-2xl md:text-4xl font-semibold">
                        Banner {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
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
    </>
  );
}

export default Menu;
