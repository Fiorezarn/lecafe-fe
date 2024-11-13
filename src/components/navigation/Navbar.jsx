import React, { useEffect, useState } from "react";
import AvatarNav from "./Avatar";
import { Menu, ShoppingCart } from "lucide-react";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { cookie } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userId = cookie?.us_id;

  useEffect(() => {
    if (userId) {
      dispatch({ type: "cart/getCartByUserId", payload: userId });
    }
  }, [userId, dispatch]);

  const totalCart =
    cart?.Menu?.reduce((acc, item) => {
      return acc + (item.Cart?.cr_quantity || 0);
    }, 0) || 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-earth border-gray-200 sticky top-0 z-10 transition-all duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Le Café
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="flex gap-6 md:gap-10 items-center">
            <a className="relative" href="/cart">
              <ShoppingCart
                className="text-white"
                size={24}
                strokeWidth={1.75}
              />
              <span className="absolute top-[-10px] left-4 inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-600 rounded-full">
                {totalCart >= 100 ? "99+" : totalCart}
              </span>
            </a>
            <Separator className="h-6 w-px bg-gray-200" aria-hidden="true" />
            <AvatarNav />
          </div>
          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white hover:text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <Menu />
          </button>
        </div>
        <div
          className={`items-center z-10 justify-between ${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
          id="navbar-user"
        >
          <ul className="flex flex-col items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-earth2 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-earth">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white rounded hover:bg-earth"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/menu"
                className="block py-2 px-3 text-white rounded hover:bg-earth"
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="/order"
                className="block py-2 px-3 text-white rounded hover:bg-earth"
              >
                Order
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
