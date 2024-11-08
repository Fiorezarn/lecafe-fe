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
import { CircleX, Minus, Plus, Trash } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState("Dine In");
  const [address, setAddress] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const { cart, count } = useSelector((state) => state.cart);
  const { messageOrder, codeOrder, loading } = useSelector(
    (state) => state.order
  );
  const { cookie } = useSelector((state) => state.auth);
  const userId = cookie?.us_id;
  const totalPrice =
    cart?.Menu?.reduce((acc, item) => {
      return acc + (item.mn_price * item.Cart?.cr_quantity || 0);
    }, 0) || 0;

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

  const handleDecrement = (itemId, count) => {
    const id = itemId;
    const quantity = count > 1 ? count - 1 : 1;
    dispatch({
      type: "cart/updateQuantity",
      payload: { id, quantity, userId },
    });
    navigate(0);
  };

  const handleIncrement = (itemId, count) => {
    const id = itemId;
    const quantity = count + 1;
    dispatch({
      type: "cart/updateQuantity",
      payload: { id, quantity, userId },
    });
    navigate(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const site = orderType === "Dine-in" ? tableNumber : address;

    if (!site) {
      toast({
        variant: "destructive",
        description: (
          <div className="flex items-center gap-2 font-bold">
            <CircleX className="text-white" />
            <p>Please provide a valid address or table number.</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
      return;
    }

    const menuJson = JSON.stringify(
      cart?.Menu?.map((item) => ({
        id: item.mn_id,
        name: item.mn_name,
        image: item.mn_image,
        price: item.mn_price,
        quantity: item.Cart?.cr_quantity,
      }))
    );

    dispatch({
      type: "order/createOrder",
      payload: {
        userId,
        typeOrder: orderType,
        site,
        totalPrice,
        menuJson,
      },
    });
  };

  useEffect(() => {
    if (codeOrder && messageOrder) {
      if (codeOrder !== 201) {
        toast({
          variant: "destructive",
          description: (
            <div className="flex items-center gap-2 font-bold">
              <CircleX className="text-white" />
              <p>{messageOrder}</p>
            </div>
          ),
          className: cn(
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
          ),
        });
      } else {
        navigate("/order");
      }
    }
  }, [codeOrder, messageOrder]);

  return (
    <>
      <Navbar navClass={"bg-earth border-gray-200 z-10"} />
      <div className="flex flex-col h-screen md:flex-row p-8 gap-8 bg-earth3">
        <section className="flex-1 h-full overflow-auto">
          <h2 className="text-2xl font-bold mb-4 text-earth">Your Cart</h2>
          <div className="space-y-4">
            {cart?.Menu?.length === 0 ? (
              <p className="text-earth text-2xl font-semibold flex items-center justify-center">
                No Cart Available
              </p>
            ) : (
              cart?.Menu?.map((item) => {
                return (
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
                        {formatPrice(item.mn_price)}
                      </p>
                    </div>
                    <div className="bg-white justify-between flex items-center border border-black rounded-md p-1">
                      <Button
                        variant="transparant"
                        size="xs"
                        className="flex items-center justify-center h-full text-black"
                        onClick={() =>
                          handleDecrement(
                            item?.Cart?.cr_id,
                            item?.Cart?.cr_quantity
                          )
                        }
                      >
                        <Minus className="h-[80%] w-[80%]" />
                      </Button>
                      <input
                        id="quantity"
                        type="number"
                        className="placeholder:leading-loose text-black w-[30%] h-full font-mono mx-2 placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="0"
                        defaultValue={item.Cart?.cr_quantity}
                        readOnly
                      />
                      <Button
                        variant="transparant"
                        size="xs"
                        className="flex items-center justify-center h-full text-black"
                        onClick={() =>
                          handleIncrement(
                            item?.Cart?.cr_id,
                            item?.Cart?.cr_quantity
                          )
                        }
                      >
                        <Plus className="h-[80%] w-[80%]" />
                      </Button>
                    </div>
                    <Button
                      variant="destructive"
                      className="flex items-center justify-center h-full ml-4"
                      onClick={() =>
                        dispatch({
                          type: "cart/deleteCart",
                          payload: { userId, menuId: item.mn_id },
                        })
                      }
                    >
                      <Trash className="h-[80%] w-[80%]" />
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <aside className="md:w-1/3 h-fit bg-brown-900 p-6 text-white rounded-lg shadow-lg md:sticky md:top-8 bg-earth2">
          <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="mt-6">
            <label className="block text-lg font-semibold mb-2">
              Order Type
            </label>
            <Select onValueChange={(value) => setOrderType(value)}>
              <SelectTrigger className="w-full text-black">
                <SelectValue placeholder="Select Order Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Order Type</SelectLabel>
                  <SelectItem value="Dine-in">Dine In</SelectItem>
                  <SelectItem value="Delivery">Delivery</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {orderType === "Dine-in" && (
            <div className="mt-4">
              <label className="block text-lg font-semibold mb-2">
                Table Number
              </label>
              <Select
                id="typeOrder"
                onValueChange={(value) => setTableNumber(value)}
              >
                <SelectTrigger className="w-full mb-4 text-black">
                  <SelectValue placeholder="Type Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {orderType === "Delivery" && (
            <div className="mt-4">
              <label className="block text-lg font-semibold mb-2">
                Address
              </label>
              <Textarea
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 rounded-lg bg-brown-700 text-black"
                placeholder="Enter delivery address"
              />
            </div>
          )}
          <Button
            className="w-full mt-6 bg-earth text-white hover:bg-gray-800"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Proceed to Checkout"}
          </Button>
        </aside>
      </div>
    </>
  );
}

export default Cart;
