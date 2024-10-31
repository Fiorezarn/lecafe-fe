import AvatarNav from "../menuNav/Avatar";
import CartNav from "../menuNav/Cart";

function Navbar({ navbarClass }) {
  return (
    <nav className={navbarClass}>
      <h1 className="text-white text-3xl">Le Café</h1>
      <div>
        <ul className="flex gap-6 text-2xl text-white">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/menu">Menu</a>
          </li>
          <li>
            <a href="/order">Order</a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="flex items-center gap-8 text-white">
          <li className="text-xl">
            <AvatarNav />
          </li>
          <li>
            <CartNav />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
