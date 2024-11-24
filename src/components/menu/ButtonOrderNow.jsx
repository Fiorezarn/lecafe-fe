import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CircleX, Coffee, MapPin, UtensilsCrossed } from "lucide-react";
import { useEffect, useState, useRef } from "react";
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
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import Search from "@arcgis/core/widgets/Search.js";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function ButtonOrderNow({ idMenu }) {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cookie } = useSelector((state) => state.auth);
  const { messageOrder, codeOrder, loading, distance } = useSelector(
    (state) => state.order
  );
  const { menuById } = useSelector((state) => state.menu);
  const [orderType, setOrderType] = useState("Dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [address, setAddress] = useState("");
  const [nameRecipient, setNameRecipient] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [note, setNote] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [latLong, setLatLong] = useState("");
  const userId = cookie?.us_id;
  const mapDiv = useRef(null);

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
      setOrderType("Dine-in");
      setTableNumber("");
      setAddress("");
      setNameRecipient("");
      setPhoneNumber("");
      setNote("");
      setLatLong("");
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (latLong) {
      dispatch({ type: "order/createDistance", payload: latLong });
    }
  }, [latLong, dispatch]);

  useEffect(() => {
    if (orderType === "Delivery" && mapDiv.current) {
      const webmap = new Map({
        basemap: "streets-navigation-vector",
      });

      const view = new MapView({
        map: webmap,
        container: mapDiv.current,
        center: [106.7829375, -6.2443009],
        zoom: 15,
      });

      const symbol = {
        type: "picture-marker",
        url: "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1732267162/location_bkusrl.png",
        color: "blue",
        width: "30px",
        height: "30px",
      };

      const pointGraphic = new Graphic({
        symbol: symbol,
      });

      const searchWidget = new Search({
        view: view,
        popupEnabled: false,
        resultGraphicEnabled: false,
      });

      view.ui.add(searchWidget, {
        position: "top-right",
        index: 2,
      });

      searchWidget.on("search-complete", function (event) {
        view.graphics.removeAll();
        const results = event.results[0].results;
        setLatLong({
          latitude: results[0].feature.attributes.InputY,
          longitude: results[0].feature.attributes.InputX,
        });
        setAddress(searchWidget.searchTerm);
        const graphic = new Graphic({
          geometry: results[0].feature.geometry,
          symbol: symbol,
          attributes: results[0].feature.attributes,
        });
        view.graphics.add(graphic);
      });

      const geocodeServiceUrl = import.meta.env.VITE_GEOCODE_SERVICE_URL;

      view.on("click", async (event) => {
        const { mapPoint } = event;
        if (mapPoint) {
          pointGraphic.geometry = mapPoint;
          view.graphics.removeAll();
          view.graphics.add(pointGraphic);

          try {
            const response = await fetch(
              `${geocodeServiceUrl}/reverseGeocode?location=${mapPoint.longitude},${mapPoint.latitude}&f=json`
            );
            const data = await response.json();

            if (data.address) {
              setLatLong({
                latitude: data.address.InputY,
                longitude: data.address.InputX,
              });
              setAddress(data.address.LongLabel);
            } else {
              setAddress("Location not recognized");
            }
          } catch (error) {
            console.error("Geocoding error:", error);
          }
        }
      });

      return () => {
        view.destroy();
      };
    }
  }, [orderType]);

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
      const feeShipping =
        distance && distance?.data !== 0 ? 2000 * distance?.data : 0;
      const totalPrice =
        orderType === "Dine-in"
          ? menuById?.mn_price
          : menuById?.mn_price + feeShipping;

      const menuJson = JSON.stringify([
        {
          id: menuById?.mn_id,
          name: menuById?.mn_name,
          image: menuById?.mn_image,
          price: menuById?.mn_price,
          quantity: 1,
        },
        {
          id: "SHIPPING",
          name: "Shipping Fee",
          price: feeShipping,
          quantity: 1,
        },
      ]);

      dispatch({
        type: "order/createOrder",
        payload: {
          userId,
          typeOrder: orderType,
          site,
          totalPrice,
          menuJson,
          nameRecipient,
          isOrderNow: true,
          note,
          phoneNumber,
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
  }, [codeOrder, messageOrder, navigate, toast, dispatch]);

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
      <DialogContent className="overflow-y-auto h-[80vh] bg-white">
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
            <Label className="block font-mono text-lg font-semibold mb-2">
              Name of Recipient
            </Label>
            <Input
              className="text-black"
              type="text"
              placeholder="Enter your name"
              value={nameRecipient}
              onChange={(e) => setNameRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label className="block font-mono text-lg font-semibold mb-2">
              Phone Number
            </Label>
            <PhoneInput
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={setPhoneNumber}
              defaultCountry="ID"
              className="w-full p-2 rounded-lg border bg-white text-black focus:outline-none focus:ring-2 focus:ring-earth2"
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
              <div
                className="mapDiv rounded-md w-full max-w-[500px] aspect-[4/3] md:w-[100%] md:aspect-auto md:h-[30vh]"
                ref={mapDiv}
              ></div>
              <span className="text-earth text-sm">
                Please click on the map to select your address or search your
                address
              </span>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 rounded-lg bg-earth6 text-earth border-earth3 focus:ring-earth2"
                placeholder="Search your address or click on the map to select your address"
                disabled
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="note" className="text-lg font-semibold text-earth1">
              Note
            </Label>
            <Input
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2 rounded-lg bg-earth6 text-earth border-earth3 focus:ring-earth2"
              placeholder="Enter any additional notes"
            />
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={handleOrderSubmit}
            className="w-full bg-earth text-earth6 hover:bg-earth1 focus:ring-4 focus:ring-earth3 font
-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 disabled:opacity-50 transition-all duration-300 ease-in-out transform hover:-translate-y-1"
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
  idMenu: PropTypes.number,
};
