import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Parallax, Navigation } from "swiper/modules";
import { Star, StarIcon } from "lucide-react";
import { IoStar } from "react-icons/io5";

function Testimoni() {
  return (
    <section className="bg-[#F6EEE8]">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-center font-sour text-2xl md:text-3xl ">
          Come and Join
        </p>
        <h2 className="text-center font-mono text-3xl md:text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          OUR HAPPY CUSTOMERS
        </h2>
        <div className="mt-10">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            centeredSlides={true}
            autoplay={{
              delay: 20000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper pt-28"
          >
            <SwiperSlide>
              <blockquote className="rounded-lg border-dashed border-earth border-4 bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-14 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-start gap-0.5 text-yellow-500">
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                    </div>
                    <p className="mt-0.5 font-mono text-lg font-medium text-gray-900">
                      Muhammad Fauzan
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-serif text-justify text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa sit rerum incidunt, a consequuntur recusandae ab saepe
                  illo est quia obcaecati neque quibusdam eius accusamus error
                  officiis atque voluptates magnam!
                </p>
              </blockquote>
            </SwiperSlide>
            <SwiperSlide>
              <blockquote className="rounded-lg border-dashed border-earth border-4 bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-14 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-start gap-0.5 text-yellow-500">
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                    </div>
                    <p className="mt-0.5 font-mono text-lg font-medium text-gray-900">
                      Muhammad Fauzan
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-serif text-justify text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa sit rerum incidunt, a consequuntur recusandae ab saepe
                  illo est quia obcaecati neque quibusdam eius accusamus error
                  officiis atque voluptates magnam!
                </p>
              </blockquote>
            </SwiperSlide>
            <SwiperSlide>
              <blockquote className="rounded-lg border-dashed border-earth border-4 bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-14 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-start gap-0.5 text-yellow-500">
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                    </div>
                    <p className="mt-0.5 font-mono text-lg font-medium text-gray-900">
                      Muhammad Fauzan
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-serif text-justify text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa sit rerum incidunt, a consequuntur recusandae ab saepe
                  illo est quia obcaecati neque quibusdam eius accusamus error
                  officiis atque voluptates magnam!
                </p>
              </blockquote>
            </SwiperSlide>
            <SwiperSlide>
              <blockquote className="rounded-lg border-dashed border-earth border-4 bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-14 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-start gap-0.5 text-yellow-500">
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                    </div>
                    <p className="mt-0.5 font-mono text-lg font-medium text-gray-900">
                      Muhammad Fauzan
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-serif text-justify text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa sit rerum incidunt, a consequuntur recusandae ab saepe
                  illo est quia obcaecati neque quibusdam eius accusamus error
                  officiis atque voluptates magnam!
                </p>
              </blockquote>
            </SwiperSlide>
            <SwiperSlide>
              <blockquote className="rounded-lg border-dashed border-earth border-4 bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-14 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-start gap-0.5 text-yellow-500">
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                    </div>
                    <p className="mt-0.5 font-mono text-lg font-medium text-gray-900">
                      Muhammad Fauzan
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-serif text-justify text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa sit rerum incidunt, a consequuntur recusandae ab saepe
                  illo est quia obcaecati neque quibusdam eius accusamus error
                  officiis atque voluptates magnam!
                </p>
              </blockquote>
            </SwiperSlide>
            <SwiperSlide>
              <blockquote className="rounded-lg border-dashed border-earth border-4 bg-gray-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="size-14 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex justify-start gap-0.5 text-yellow-500">
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                      <IoStar className="h-5 w-5" />
                    </div>
                    <p className="mt-0.5 font-mono text-lg font-medium text-gray-900">
                      Muhammad Fauzan
                    </p>
                  </div>
                </div>

                <p className="mt-4 font-serif text-justify text-gray-700">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Culpa sit rerum incidunt, a consequuntur recusandae ab saepe
                  illo est quia obcaecati neque quibusdam eius accusamus error
                  officiis atque voluptates magnam!
                </p>
              </blockquote>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Testimoni;
