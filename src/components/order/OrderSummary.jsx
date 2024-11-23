import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CircleX, Coffee, MapPin, UtensilsCrossed } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { setMessageOrder } from "@/features/order/orderSlice";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import Graphic from "@arcgis/core/Graphic";
import Search from "@arcgis/core/widgets/Search.js";
import { Label } from "../ui/label";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export function OrderSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState("Dine-in");
  const [address, setAddress] = useState("");
  const [nameRecipient, setNameRecipient] = useState("");
  const [note, setNote] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [latLong, setLatLong] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const { messageOrder, codeOrder, loading, distance } = useSelector(
    (state) => state.order
  );
  const { cookie } = useSelector((state) => state.auth);
  const userId = cookie?.us_id;
  const subtotal =
    cart?.Menu?.reduce((acc, item) => {
      return acc + (item.mn_price * item.Cart?.cr_quantity || 0);
    }, 0) || 0;

  const feeShipping =
    distance && distance?.data !== 0 ? 2000 * distance?.data : 0;

  const totalPrice =
    orderType === "Dine-in" ? subtotal : subtotal + feeShipping;

  const mapDiv = useRef(null);

  useEffect(() => {
    if (latLong) {
      dispatch({ type: "order/createDistance", payload: latLong });
    }
  }, [latLong]);

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

    const menuJson = JSON.stringify([
      ...cart?.Menu?.map((item) => ({
        id: item.mn_id,
        name: item.mn_name,
        image: item.mn_image,
        price: item.mn_price,
        quantity: item.Cart?.cr_quantity,
      })),
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
        isOrderNow: false,
        note,
        phoneNumber,
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
    <aside
      className={`md:w-1/3 ${
        orderType === "Delivery" ? "md:h-[85vh]" : "md:h-[80vh]"
      } md:overflow-y-auto bg-brown-900 p-6 text-white rounded-lg shadow-lg md:sticky md:top-8 bg-earth2 ${
        cart?.Menu?.length === 0 ? "hidden" : ""
      }`}
    >
      <div>
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
      <div className="mt-6">
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
      <div className="mt-6">
        <Label className="block font-mono text-lg font-semibold mb-2">
          Order Type
        </Label>
        <Select
          onValueChange={(value) => {
            console.log(value);
            setOrderType(value);
          }}
        >
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
          <div
            className="mapDiv rounded-md w-full max-w-[500px] aspect-[4/3] md:w-[100%] md:aspect-auto md:h-[50vh]"
            ref={mapDiv}
          ></div>
          <span className="text-earth6">
            Please click on the map to select your address or search your
            address
          </span>
          <label className="block text-lg font-semibold mb-2 mt-4">
            Address
          </label>
          <Textarea
            disabled
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 rounded-lg bg-white text-black"
            placeholder="Enter delivery address"
          />
        </div>
      )}
      <div className="mt-4">
        <Label className="block text-lg font-semibold mb-2">Note</Label>
        <Input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full p-2 rounded-lg bg-brown-700 text-black"
          placeholder="Enter Note"
        />
      </div>
      <div className="mt-6">
        <div className="flex justify-between font-bold text-lg my-4">
          <span className="font-mono">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg my-4">
          <span className="font-mono">Fee Shipping</span>
          <span>
            {orderType === "Dine-in"
              ? formatPrice(0)
              : formatPrice(feeShipping)}
          </span>
        </div>
        <Separator className="h-1 w-py bg-gray-200" aria-hidden="true" />
        <div className="flex justify-between font-bold text-lg my-4">
          <span className="font-mono">Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
      </div>
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
  );
}
