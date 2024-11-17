import { FaFacebook } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiWhatsapp } from "react-icons/si";
import { FaSquareGithub } from "react-icons/fa6";
import { HiOutlineMail, HiOutlinePhone, HiOutlineClock } from "react-icons/hi";

function Footer() {
  return (
    <footer className="bg-earth2 px-6 py-16 text-white">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto space-y-12 md:space-y-0">
        <div className="flex flex-col items-center md:items-start space-y-6">
          <img
            className="w-60"
            src="https://res.cloudinary.com/dsxnvgy7a/image/upload/v1731513626/01HXRHJA87CGBCDRR7F22N0BM6_kzdvwb.png"
            alt="Le Café Logo"
          />
          <div className="flex items-center">
            <span className="text-lg font-mono font-semibold bg-black text-white p-2 rounded-l-md border-2 border-black">
              Le Café
            </span>
            <span className="text-lg font-mono font-semibold bg-white text-black p-2 rounded-r-md border-2 border-black">
              Gandaria City
            </span>
          </div>
        </div>

        <div className="text-center md:text-left space-y-4">
          <h3 className="text-lg font-mono font-semibold uppercase tracking-wide">
            Contact Us
          </h3>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <HiOutlineMail className="text-xl" />
            <span className="text-sm">contact@lecafe.com</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <HiOutlinePhone className="text-xl" />
            <span className="text-sm">+62 123 456 789</span>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <HiOutlineClock className="text-xl" />
            <span className="text-sm">Mon - Fri, 8:00 AM - 8:00 PM</span>
          </div>
        </div>

        <div className="flex flex-col md:items-end space-y-6">
          <nav className="flex flex-wrap justify-center md:justify-end space-x-6">
            {["About", "Blog", "Team", "Pricing", "Contact", "Terms"].map(
              (link) => (
                <a
                  key={link}
                  href="/"
                  className="text-sm md:text-base font-mono hover:text-gray-300 transition-colors"
                >
                  {link}
                </a>
              )
            )}
          </nav>

          <div className="flex justify-center space-x-6">
            {[
              { name: "Facebook", link: "/", icon: <FaFacebook /> },
              { name: "Instagram", link: "#", icon: <GrInstagram /> },
              { name: "Twitter", link: "#", icon: <FaSquareXTwitter /> },
              { name: "GitHub", link: "#", icon: <FaSquareGithub /> },
              { name: "WhatsApp", link: "#", icon: <SiWhatsapp /> },
            ].map((social) => (
              <a
                key={social.name}
                href={social.link}
                className="text-white hover:text-yellow-500 transition-colors duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <p className="text-sm text-center md:text-right font-sans mt-4 md:mt-0 opacity-75">
            © 2021 Le Café, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
