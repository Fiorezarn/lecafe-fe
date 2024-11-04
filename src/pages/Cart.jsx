import Navbar from "@/components/navbar/Navbar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash } from "lucide-react"; // Ikon untuk increment, decrement, dan delete

function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { cookie } = useSelector((state) => state.auth);
  const userId = cookie?.us_id;

  useEffect(() => {
    if (!cookie) {
      dispatch({ type: "auth/getCookie" });
    }
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch({ type: "cart/getCartByUserId", payload: userId });
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (cart) {
      console.log(cart);
    }
  }, [cart]);

  const [orderType, setOrderType] = useState("Dine In");
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const calculateTotal = () => {
    return cart?.Menu?.reduce(
      (total, item) => total + item.mn_price * item.Cart.cr_quantity,
      0
    ).toFixed(2);
  };

  // Fungsi untuk mengubah kuantitas item
  const handleDecrement = (itemId) => {
    dispatch({ type: "cart/decrement", payload: itemId });
  };

  const handleIncrement = (itemId) => {
    dispatch({ type: "cart/increment", payload: itemId });
  };

  const handleDelete = (itemId) => {
    dispatch({ type: "cart/deleteItem", payload: itemId });
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col md:flex-row pt-32 h-[100vh] p-8 gap-8 bg-earth3">
        <section className="flex-1">
          <h2 className="text-2xl font-bold mb-4 text-earth">Your Cart</h2>
          <div className="space-y-4">
            {cart?.Menu?.map((item) => (
              <div
                key={item.mn_id}
                className="flex items-center bg-earth2 justify-between p-4 bg-brown-800 text-white rounded-lg shadow-md"
              >
                <img
                  src={item.mn_image}
                  alt={item.mn_name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-semibold">{item.mn_name}</h3>
                  <p className="text-sm text-gray-300">
                    Rp {item.mn_price.toLocaleString()} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="transparant"
                    size="xs"
                    className="flex items-center justify-center h-full text-black"
                    onClick={() => handleDecrement(item.mn_id)}
                  >
                    <Minus className="h-[80%] w-[80%]" />
                  </Button>
                  <input
                    id="quantity"
                    type="number"
                    className="placeholder:leading-loose text-black w-[30%] h-full font-mono mx-2 placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0"
                    value={item.Cart.cr_quantity}
                    readOnly
                  />
                  <Button
                    variant="transparant"
                    size="xs"
                    className="flex items-center justify-center h-full text-black"
                    onClick={() => handleIncrement(item.mn_id)}
                  >
                    <Plus className="h-[80%] w-[80%]" />
                  </Button>
                  <span className="font-bold ml-2">
                    Rp{" "}
                    {(item.mn_price * item.Cart.cr_quantity).toLocaleString()}
                  </span>
                  <Button
                    variant="danger"
                    size="xs"
                    className="flex items-center justify-center h-full text-red-600 ml-4"
                    onClick={() => handleDelete(item.mn_id)}
                  >
                    <Trash className="h-[80%] w-[80%]" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="md:w-1/3 bg-brown-900 p-6 text-white rounded-lg shadow-lg md:sticky md:top-8 bg-earth2">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>Rp {calculateTotal()}</span>
          </div>

          {/* Order Type Selection */}
          <div className="mt-6">
            <label className="block text-lg font-semibold mb-2">
              Order Type
            </label>
            <Select onValueChange={(value) => setOrderType(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Order Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Order Type</SelectLabel>
                  <SelectItem value="Dine In">Dine In</SelectItem>
                  <SelectItem value="Delivery">Delivery</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Conditional Inputs */}
          {orderType === "Dine In" && (
            <div className="mt-4">
              <label className="block text-lg font-semibold mb-2">
                Table Number
              </label>
              <input
                type="number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full p-2 rounded-lg bg-brown-700 text-white"
                placeholder="Enter table number"
              />
            </div>
          )}

          {orderType === "Delivery" && (
            <div className="mt-4">
              <label className="block text-lg font-semibold mb-2">
                Address
              </label>
              <textarea
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 rounded-lg bg-brown-700 text-white"
                placeholder="Enter delivery address"
              />
            </div>
          )}

          <Button className="w-full mt-6 bg-earth text-white hover:bg-gray-800">
            Proceed to Checkout
          </Button>
        </aside>
      </div>
    </>
  );
}

export default Cart;
