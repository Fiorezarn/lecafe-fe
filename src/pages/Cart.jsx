import Navbar from "@/components/navigation/Navbar";
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
import {
  CircleX,
  Coffee,
  MapPin,
  Minus,
  Plus,
  Trash,
  UtensilsCrossed,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NoData from "@/components/orderStatus/NoData";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { setMessageOrder } from "@/features/order/orderSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState("Dine In");
  const [address, setAddress] = useState("");
  const [nameRecipient, setNameRecipient] = useState("");
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
  };

  const handleIncrement = (itemId, count) => {
    const id = itemId;
    const quantity = count + 1;
    dispatch({
      type: "cart/updateQuantity",
      payload: { id, quantity, userId },
    });
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
        nameRecipient,
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
        dispatch(setMessageOrder(null));
        return;
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
          <h2 className="text-2xl font-bold mb-4 text-earth font-mono">
            Your Cart
          </h2>
          <div className="space-y-4">
            {cart?.Menu?.length === 0 ? (
              <NoData
                className="text-center"
                title="Your cart is empty"
                paragraph="Looks like you haven't added anything to your cart yet. Start shopping!"
              />
            ) : (
              cart?.Menu?.map((item) => {
                return (
                  <div
                    key={item.mn_id}
                    className="flex flex-col lg:flex-row items-center bg-earth2 justify-between p-4 bg-brown-800 text-white rounded-lg shadow-md"
                  >
                    <img
                      src={item.mn_image}
                      alt={item.mn_name}
                      className="w-16 h-16 rounded-md object-cover mb-4 lg:mb-0 lg:mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="lg:text-xl font-mono font-semibold">
                        {item.mn_name}
                      </h3>
                      <p className="text-xs lg:text-sm text-gray-300">
                        {formatPrice(item.mn_price)}
                      </p>
                    </div>
                    <div className="flex items-center w-full lg:w-auto mt-4 lg:mt-0 justify-between gap-2">
                      <div className="bg-white flex items-center border border-black rounded-md p-1 w-full max-w-xs">
                        <Button
                          variant="transparent"
                          size="xs"
                          className="flex items-center justify-center h-full text-black"
                          onClick={() =>
                            handleDecrement(
                              item?.Cart?.cr_id,
                              item?.Cart?.cr_quantity
                            )
                          }
                        >
                          <Minus />
                        </Button>
                        <input
                          id="quantity"
                          type="number"
                          className="placeholder:leading-loose text-black h-full font-mono mx-2 placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none w-16"
                          placeholder="0"
                          value={item.Cart?.cr_quantity}
                          readOnly
                        />
                        <Button
                          variant="transparent"
                          size="xs"
                          className="flex items-center justify-center h-full text-black"
                          onClick={() =>
                            handleIncrement(
                              item?.Cart?.cr_id,
                              item?.Cart?.cr_quantity
                            )
                          }
                        >
                          <Plus />
                        </Button>
                      </div>
                      <Button
                        variant="destructive"
                        className="flex items-center justify-center h-full lg:w-auto w-full ml-4"
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
                  </div>
                );
              })
            )}
          </div>
        </section>
        <aside
          className={`md:w-1/3 h-fit bg-brown-900 p-6 text-white rounded-lg shadow-lg md:sticky md:top-8 bg-earth2 ${
            cart?.Menu?.length === 0 ? "hidden" : ""
          }`}
        >
          <h3 className="text-2xl font-bold mb-4 font-mono">Order Summary</h3>
          <div className="flex justify-between font-bold text-lg my-4">
            <span className="font-mono">Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Separator className="h-1 w-py bg-gray-200" aria-hidden="true" />
          <div className="mt-6">
            <label className="block font-mono text-lg font-semibold mb-2">
              Name of Recipient
            </label>
            <Input
              className="text-black"
              id="nameRecipient"
              type="text"
              placeholder="Enter your name"
              value={nameRecipient}
              onChange={(e) => setNameRecipient(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <label className="block font-mono text-lg font-semibold mb-2">
              Order Type
            </label>
            <Select onValueChange={(value) => setOrderType(value)}>
              <SelectTrigger
                id="orderType"
                className="w-full text-earth border-earth3 focus:ring-earth2"
              >
                <SelectValue placeholder="Select Order Type" />
              </SelectTrigger>
              <SelectContent className="bg-earth6">
                <SelectGroup>
                  <SelectLabel className="text-earth1">Order Type</SelectLabel>
                  <SelectItem
                    value="Dine-in"
                    className="text-earth hover:bg-earth4"
                  >
                    <div className="flex items-center">
                      <UtensilsCrossed className="w-4 h-4 mr-2 text-earth2" />
                      Dine In
                    </div>
                  </SelectItem>
                  <SelectItem
                    value="Delivery"
                    className="text-earth hover:bg-earth4"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-earth2" />
                      Delivery
                    </div>
                  </SelectItem>
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
                <SelectTrigger
                  id="tableNumber"
                  className="w-full text-amber-900 border-earth1 focus:border-earth1"
                >
                  <SelectValue placeholder="Select Table Number" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10).keys()].map((num) => (
                    <SelectItem key={num + 1} value={String(num + 1)}>
                      Table {num + 1}
                    </SelectItem>
                  ))}
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
            onClick={handleSubmit}
            className="w-full mt-6 bg-earth text-white font-mono text-xs lg:text-lg hover:bg-gray-800"
            disabled={loading}
          >
            {loading ? (
              <Coffee className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Coffee className="mr-2 h-4 w-4" />
            )}
            {loading ? "Processing..." : "Proceed to Checkout"}
          </Button>
        </aside>
      </div>
    </>
  );
}

export default Cart;
