import { FaHandshake, FaLightbulb, FaUserTie } from "react-icons/fa";

function AboutUs() {
  return (
    <section className="bg-earth1 py-16">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center gap-10 px-6 lg:px-20">
        <div className="flex flex-col gap-6 lg:w-1/2">
          <h1 className="text-4xl text-center lg:text-left font-mono font-bold text-earth4">
            About Us
          </h1>
          <article className="text-earth4 text-lg font-mono leading-relaxed text-justify">
            We are dedicated to providing innovative, professional, and reliable
            solutions tailored to your needs. With a focus on excellence and
            client satisfaction, we ensure every project meets your
            expectations.
          </article>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-300 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-earth3 to-earth4 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-0"></div>
              <FaUserTie className="text-4xl text-earth2 mb-4 mx-auto z-10 relative group-hover:text-white transition-colors duration-300" />
              <h2 className="text-xl font-semibold text-earth2 mb-2 z-10 relative group-hover:text-white transition-colors duration-300">
                Professional
              </h2>
              <p className="text-sm text-gray-600 font-mono z-10 relative group-hover:text-white transition-colors duration-300">
                We deliver the best results with expertise and experience you
                can trust.
              </p>
            </div>

            <div className="relative group p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-300 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-earth3 to-earth4 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-0"></div>
              <FaLightbulb className="text-4xl text-earth2 mb-4 mx-auto z-10 relative group-hover:text-white transition-colors duration-300" />
              <h2 className="text-xl font-semibold text-earth2 mb-2 z-10 relative group-hover:text-white transition-colors duration-300">
                Innovative
              </h2>
              <p className="text-sm text-gray-600 font-mono z-10 relative group-hover:text-white transition-colors duration-300">
                Creative and tailored solutions to match your unique needs.
              </p>
            </div>

            <div className="relative group p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-300 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-earth3 to-earth4 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-0"></div>
              <FaHandshake className="text-4xl text-earth2 mb-4 mx-auto z-10 relative group-hover:text-white transition-colors duration-300" />
              <h2 className="text-xl font-semibold text-earth2 mb-2 z-10 relative group-hover:text-white transition-colors duration-300">
                Reliable
              </h2>
              <p className="text-sm text-gray-600 font-mono z-10 relative group-hover:text-white transition-colors duration-300">
                Trust and transparency in every step of our journey together.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center">
          <img
            className="w-full max-w-md lg:max-w-lg transform transition-transform duration-500 hover:scale-105 rounded-lg shadow-lg"
            src="https://res.cloudinary.com/dsxnvgy7a/image/upload/v1731802324/Pngtree_closeup_of_male_hand_holding_15669643_rgdla0.png"
            alt="about us"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
