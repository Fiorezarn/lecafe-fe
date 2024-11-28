import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Parallax, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

function BannerSwiper() {
  const swiperContent = [
    {
      id: 1,
      alt: "Banner 1",
      image:
        "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730865829/Beige_Modern_Cafe_Banner_t8pitc.png",
    },
    {
      id: 2,
      alt: "Banner 2",
      image:
        "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730865828/Beige_Brown_Abstract_Modern_Coffee_Shop_Banner_ct20fa.png",
    },
    {
      id: 3,
      alt: "Banner 3",
      image:
        "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1730865638/Brown_Modern_Coffee_Shop_Opening_and_Closing_Hours_Banner_vkojd9.png",
    },
  ];

  return (
    <div className="px-6 lg:px-28 py-10 bg-earth3">
      <Swiper
        slidesPerView={1}
        grabCursor={true}
        rewind={true}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        parallax={true}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Autoplay, Pagination, Parallax, Navigation]}
        className="w-full h-full"
      >
        {swiperContent.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <img
                src={item.image}
                alt={item.alt || `Slide ${index + 1}`}
                className="w-full h-full rounded-xl bg-center object-cover"
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-next-custom swiper-button-next right-5 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer">
          <ChevronRight />
        </div>
        <div className="swiper-button-prev-custom swiper-button-prev left-5 top-1/2 transform -translate-y-1/2 text-white text-2xl cursor-pointer">
          <ChevronLeft />
        </div>
      </Swiper>
    </div>
  );
}

export default BannerSwiper;
