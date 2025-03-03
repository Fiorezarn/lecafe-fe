import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { IoStar } from "react-icons/io5";

const testimonials = [
  {
    name: "Alifia Asri",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    rating: 6,
    text: "The coffee is fantastic, and the cozy atmosphere makes it my favorite spot to relax or work.",
  },
  {
    name: "Mr Sigit Sasongko",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    rating: 5,
    text: "Amazing coffee and a relaxing vibe. Perfect for work or catching up with friends.",
  },
  {
    name: "Rifqi Top up",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    rating: 5,
    text: "The coffee variety here is impressive, and the staff always gives great recommendations.",
  },
  {
    name: "Ramadhanty",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    rating: 6,
    text: "The coffee is excellent, and their pastries are absolutely delicious! Highly recommended.",
  },
  {
    name: "Hansen Billy",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    rating: 5,
    text: "As a coffee lover, I can say this place serves the best coffee with unmatched quality.",
  },
  {
    name: "Fauzan Simorangkir",
    image:
      "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
    rating: 6,
    text: "I've been a regular for years, and I love their seasonal specials and ethical sourcing.",
  },
];

function Testimoni() {
  return (
    <section className="bg-earth6">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-center font-sour text-2xl md:text-3xl">
          Come and Join
        </p>
        <h2 className="text-center font-mono text-3xl md:text-4xl font-bold tracking-tight text-[#493628] sm:text-5xl">
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
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <blockquote className="rounded-lg border-dashed border-[#493628] border-4 bg-gray-50 p-6 shadow-sm md:p-8 h-[200px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        alt={`${testimonial.name}'s avatar`}
                        src={testimonial.image}
                        className="size-14 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex justify-start gap-0.5 text-yellow-500">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <IoStar key={i} className="h-5 w-5" />
                          ))}
                        </div>
                        <p className="mt-0.5 font-mono text-lg font-medium text-[#493628]">
                          {testimonial.name}
                        </p>
                      </div>
                    </div>
                    <p className="font-serif text-[#6e513c] line-clamp-4 overflow-hidden">
                      {testimonial.text}
                    </p>
                  </div>
                </blockquote>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default Testimoni;
