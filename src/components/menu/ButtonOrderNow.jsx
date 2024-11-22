import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CircleX, Coffee, MapPin, UtensilsCrossed } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";
import PropTypes from "prop-types";
import { Input } from "../ui/input";
import { setMessageOrder } from "@/features/order/orderSlice";

function ButtonOrderNow({ idMenu }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cookie } = useSelector((state) => state.auth);
  const { messageOrder, codeOrder, loading } = useSelector(
    (state) => state.order
  );
  const { menuById } = useSelector((state) => state.menu);
  const [orderType, setOrderType] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [address, setAddress] = useState("");
  const [nameRecipient, setNameRecipient] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const userId = cookie?.us_id;

  const handleOrderNowClick = () => {
    if (!cookie) {
      navigate("/login");
      return;
    }
    setIsDialogOpen(true);
    dispatch({ type: "menu/getMenuById", payload: idMenu });
  };

  useEffect(() => {
    if (isDialogOpen) {
      setOrderType("");
      setTableNumber("");
      setAddress("");
      setNameRecipient("");
    }
  }, [isDialogOpen]);

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
          nameRecipient,
          isOrderNow: true,
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
        dispatch(setMessageOrder(null));
        return;
      } else {
        window.scrollTo(0, 0);
        navigate("/order");
      }
    }
  }, [codeOrder, messageOrder]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleOrderNowClick}
          className="bg-earth hover:bg-earth1 font-mono shadow-md shadow-earth3 hover:shadow-lg hover:shadow-earth2 transform hover:-translate-y-1 transition-all duration-300 ease-in-out text-earth6"
        >
          Order Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-earth">
            Place Your Order
          </DialogTitle>
          <DialogDescription className="text-earth1">
            Choose your order type and provide details. Click proceed when
            you're ready.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4 bg-earth3" />
        <div className="space-y-4">
          <Card className="bg-earth6">
            <CardContent className="flex items-center space-x-4 p-4">
              <img
                className="w-20 h-20 rounded-md object-cover"
                src={menuById?.mn_image}
                alt={menuById?.mn_name}
              />
              <div>
                <h3 className="text-lg font-semibold text-earth">
                  {menuById?.mn_name}
                </h3>
                <p className="text-sm text-earth1">Selected Item</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label
              htmlFor="orderType"
              className="block font-mono text-lg font-semibold mb-2"
            >
              Order Type
            </Label>
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
            <div className="space-y-2">
              <Label
                htmlFor="tableNumber"
                className="text-lg font-semibold text-earth1"
              >
                Table Number
              </Label>
              <Select onValueChange={(value) => setTableNumber(value)}>
                <SelectTrigger
                  id="tableNumber"
                  className="w-full text-amber-900 border-amber-300 focus:ring-amber-500"
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
            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-lg font-semibold text-earth1"
              >
                Address
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 rounded-lg bg-earth6 text-earth border-earth3 focus:ring-earth2"
                placeholder="Enter delivery address"
              />
            </div>
          )}
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleOrderSubmit}
            className="w-full bg-earth text-earth6 hover:bg-earth1 focus:ring-4 focus:ring-earth3 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
            disabled={loading}
          >
            {loading ? (
              <Coffee className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Coffee className="mr-2 h-4 w-4" />
            )}
            {loading ? "Processing..." : "Proceed to Checkout"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonOrderNow;

ButtonOrderNow.propTypes = {
  idMenu: PropTypes.oneOfType([PropTypes.number]),
};
