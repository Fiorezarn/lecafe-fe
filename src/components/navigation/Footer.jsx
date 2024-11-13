import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import { FaSquareGithub } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-earth2 px-6 py-12 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex flex-col items-center md:items-start space-y-4">
          <img
            className="w-60"
            src="https://res.cloudinary.com/dsxnvgy7a/image/upload/v1731513626/01HXRHJA87CGBCDRR7F22N0BM6_kzdvwb.png"
            alt="Le Café Logo"
          />
          <div className="text-center flex items-center justify-center md:text-left">
            <span className="block text-lg border-2 border-black bg-black p-2 font-mono rounded-l-md font-semibold">
              Le Café
            </span>
            <span className="text-lg border-2 border-black font-semibold font-mono bg-white p-2 text-black rounded-r-md">
              Gandaria City
            </span>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center mt-8 md:mt-0 space-x-4 space-y-2 md:space-y-0 md:space-x-8">
          {["About", "Blog", "Team", "Pricing", "Contact", "Terms"].map(
            (link) => (
              <a
                key={link}
                href="/"
                className="text-sm md:text-base leading-6 text-gray-300 hover:text-white"
              >
                {link}
              </a>
            )
          )}
        </nav>

        <div className="flex justify-center space-x-6 mt-8 md:mt-0">
          {[
            { name: "Facebook", link: "/", icon: <FaFacebook /> },
            { name: "Instagram", link: "#", icon: <GrInstagram /> },
            { name: "Twitter", link: "#", icon: <FaSquareXTwitter /> },
            { name: "GitHub", link: "#", icon: <FaSquareGithub /> },
            { name: "Dribbble", link: "#", icon: <SiWhatsapp /> },
          ].map((social) => (
            <a
              key={social.name}
              href={social.link}
              className="text-gray-400 hover:text-gray-300"
            >
              <span className="sr-only">{social.name}</span>
              <span>{social.icon}</span>
            </a>
          ))}
        </div>
      </div>

      <p className="text-sm text-center text-gray-400">
        © 2021 Le Café, Inc. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
