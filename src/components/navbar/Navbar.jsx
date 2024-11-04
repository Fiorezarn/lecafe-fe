import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import AvatarNav from "../menuNav/Avatar";
import CartNav from "../menuNav/Cart";

function Navbar({ isFixed = true }) {
  const [navbar, setNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = window.innerWidth <= 768; // Deteksi jika di mobile

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 80 || isMobile) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    if (
      document.documentElement.scrollHeight <= window.innerHeight ||
      isMobile
    ) {
      setNavbar(true);
    } else {
      window.addEventListener("scroll", changeBackground);
    }

    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, [isMobile]);

  return (
    <nav
      className={`w-full ${
        isFixed ? "fixed" : ""
      } z-20 flex justify-between items-center mx-auto py-4 px-6 md:px-12 text-white transition duration-500 ease-in-out ${
        navbar ? "bg-earth" : "bg-transparent"
      }`}
    >
      <h1 className="text-white text-3xl">Le Café</h1>

      {/* Hamburger Icon and Cart for Mobile */}
      <div className="flex items-center gap-4 md:hidden">
        <CartNav cartClass="text-white cursor-pointer" />
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? (
            <X className="text-white" size={30} />
          ) : (
            <Menu className="text-white" size={30} />
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`${
          menuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row gap-6 text-xl text-white absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-earth md:bg-transparent md:items-center p-4 md:p-0`}
      >
        <div className="md:hidden mt-4">
          <AvatarNav />
        </div>
        <a href="/" className="py-2 hover:text-gray-300 md:px-4">
          Home
        </a>
        <a href="/menu" className="py-2 hover:text-gray-300 md:px-4">
          Menu
        </a>
        <a href="/order" className="py-2 hover:text-gray-300 md:px-4">
          Order
        </a>
      </div>

      <div className="hidden md:flex items-center gap-8 text-white">
        <AvatarNav />
        <CartNav cartClass="text-white cursor-pointer" />
      </div>
    </nav>
  );
}

export default Navbar;
