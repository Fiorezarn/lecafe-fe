import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function ButtonOrderNow({ idMenu }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { cookie } = useSelector((state) => state.auth);
  const { messageOrder, codeOrder, loading } = useSelector(
    (state) => state.order
  );
  const { menuById } = useSelector((state) => state.menu);
  const [orderType, setOrderType] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const userId = cookie?.us_id;

  const handleOrderSubmit = () => {
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
    const id = idMenu;
    dispatch({ type: "menu/getMenuById", payload: id });

    if (menuById) {
      const menuJson = JSON.stringify([
        {
          id: menuById?.mn_id,
          name: menuById?.mn_name,
          image: menuById?.mn_image,
          price: menuById?.mn_price,
          quantity: 1,
        },
      ]);
      dispatch({
        type: "order/createOrder",
        payload: {
          userId,
          typeOrder: orderType,
          site,
          totalPrice: menuById?.mn_price,
          menuJson: menuJson,
        },
      });
    }
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
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-earth">Order Now</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Place Your Order</DialogTitle>
            <DialogDescription>
              Choose your order type and provide details. Click proceed when
              you're ready.
            </DialogDescription>
          </DialogHeader>

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
              <Select onValueChange={(value) => setTableNumber(value)}>
                <SelectTrigger className="w-full mb-4 text-black">
                  <SelectValue placeholder="Select Table Number" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10).keys()].map((num) => (
                    <SelectItem key={num + 1} value={String(num + 1)}>
                      {num + 1}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 rounded-lg bg-brown-700 text-black"
                placeholder="Enter delivery address"
              />
            </div>
          )}

          <DialogFooter>
            <Button
              className="w-full mt-6 bg-earth text-white hover:bg-gray-800"
              onClick={handleOrderSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Proceed to Checkout"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ButtonOrderNow;
