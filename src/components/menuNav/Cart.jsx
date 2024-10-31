"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { ShoppingBasket, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/utils";

function CartNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { cookie } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);
  const userId = cookie?.us_id;
  const [typeOrder, setTypeOrder] = React.useState("");
  const totalPrice = cart?.Menu?.reduce((acc, item) => {
    return acc + item.mn_price * item.Cart?.cr_quantity;
  }, 0);

  useEffect(() => {
    dispatch({ type: "cart/getCartByUserId", payload: userId });
  }, [userId]);

  useEffect(() => {
    dispatch({ type: "auth/getCookie" });
  }, [dispatch]);

  useEffect(() => {
    if (order) {
      const code = order?.code;
      if (code !== 201) {
        toast.error(order?.message);
      } else {
        navigate("/order");
      }
    }
  }, [order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const site = e.target.site.value;
    const totalPrice = e.target.totalPrice.value;
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
      payload: { userId, site, typeOrder, totalPrice, menuJson },
    });
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ShoppingBasket
          className="text-muted-foreground hover:text-black cursor-pointer"
          size={28}
          strokeWidth={1.75}
        />
      </SheetTrigger>
      <SheetContent className="flex justify-between flex-col gap-6">
        <SheetTitle>Cart</SheetTitle>
        {cart?.Menu.length === 0 ? (
          <h1 className="text-black text-center">No Cart Available</h1>
        ) : (
          <ul className="flex flex-col gap-2 mt-10 p-4 rounded-md overflow-y-scroll h-[500px]">
            {cart?.Menu?.map((item, index) => {
              return (
                <li
                  className="flex justify-between bg-earth4 p-4 rounded-lg"
                  key={index}
                >
                  <div>
                    <h1>{item.mn_name}</h1>
                    <p>{item.mn_category}</p>
                  </div>
                  <div className="flex w-1/2 items-center">
                    <Input type="number" value={item.Cart?.cr_quantity} />
                    <Button
                      onClick={() =>
                        dispatch({
                          type: "cart/deleteCart",
                          payload: { userId, menuId: item.mn_id },
                        })
                      }
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <p>Total: {formatPrice(totalPrice)}</p>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              id="totalPrice"
              className="hidden"
              defaultValue={totalPrice}
            />
            <Select id="typeOrder" onValueChange={setTypeOrder}>
              <SelectTrigger className="w-full mb-4">
                <SelectValue placeholder="Type Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Delivery">Delivery</SelectItem>
                <SelectItem value="Dine-in">Dine-In</SelectItem>
              </SelectContent>
            </Select>
            {typeOrder === "Dine-in" ? (
              <Select id="typeOrder">
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Type Order" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delivery">1</SelectItem>
                  <SelectItem value="Dine-in">2</SelectItem>
                  <SelectItem value="Dine-in">3</SelectItem>
                  <SelectItem value="Dine-in">4</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="site"
                className="mb-4"
                type="text"
                placeholder="Address"
              />
            )}
            <Button className="w-full">Checkout</Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CartNav;
