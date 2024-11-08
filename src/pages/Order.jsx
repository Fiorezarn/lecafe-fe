import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import { Button } from "@/components/ui/button";
import {
  CheckCircleIcon,
  CircleAlert,
  CircleCheckBigIcon,
  ClockIcon,
  MessageCircleX,
  TruckIcon,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function Order() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { orderById, coordinates, messageOrder, transactions } = useSelector(
    (state) => state.order
  );
  const navigate = useNavigate();
  const { cookie } = useSelector((state) => state.auth);
  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTab, setIsOpenTab] = useState(false);
  const id = cookie?.us_id;
  const queryParams = new URLSearchParams(window.location.search);
  const orderIdMidtrans = queryParams.get("order_id");

  useEffect(() => {
    if (orderIdMidtrans && id) {
      dispatch({
        type: "payments/createVerifyPayments",
        payload: { orderIdMidtrans, userId: id },
      });
    }
  }, [orderIdMidtrans, id]);

  useEffect(() => {
    if (messageOrder) {
      toast({
        description: (
          <div className="flex gap-2 font-bold">
            <CircleCheckBigIcon className="text-green-600" />
            <p>{messageOrder}</p>
          </div>
        ),
        className: cn(
          "top-10 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  }, [messageOrder]);

  const handlePayment = (id, amount) => {
    const email = cookie?.us_email;
    dispatch({
      type: "payments/createPayments",
      payload: { email, amount, id },
    });
  };

  const cancelPayments = (id) => {
    dispatch({ type: "payments/cancelPayments", payload: id });
    navigate(0);
  };

  useEffect(() => {
    const clientKey = import.meta.env.VITE_CLIENT_KEY_MIDTRANS;
    const snapUrl = import.meta.env.VITE_SNAP_URL_MIDTRANS;
    const script = document.createElement("script");
    script.src = snapUrl;
    script.setAttribute("data-client-key", clientKey);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const token = transactions?.token;
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          console.log("Payment success:", result);
        },
        onPending: (result) => {
          console.log("Payment pending:", result);
        },
        onError: (result) => {
          console.log("Payment error:", result);
        },
        onClose: () => {
          console.log("Payment closed");
        },
      });
    }
  }, [transactions]);

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        basemap: "streets-navigation-vector",
      });

      const mapView = new MapView({
        map: map,
        container: mapRef.current,
        zoom: 18,
      });

      setView(mapView);

      return () => {
        if (view) {
          view.destroy();
        }
      };
    }
  }, [isOpen, isOpenTab]);

  useEffect(() => {
    if (id) {
      dispatch({ type: "order/getAllOrder", payload: id });
    }
  }, [id]);

  useEffect(() => {
    if (orderById) {
      const orderCoordinates = orderById?.order?.Order?.map((order) => ({
        destinationLongitude: order.or_longitude,
        destinationLatitude: order.or_latitude,
        originLatitude: orderById.origins.latitude,
        originLongitude: orderById.origins.longitude,
      })).filter(
        (coordinate) =>
          coordinate.destinationLatitude !== null &&
          coordinate.destinationLongitude !== null
      );

      if (orderCoordinates?.length > 0) {
        dispatch({ type: "map/fetchCoordinates", payload: orderCoordinates });
      }
    }
  }, [orderById]);

  useEffect(() => {
    if (coordinates && view) {
      view.when(() => {
        orderById?.order?.Order?.map((order, index) => {
          const originPoint = {
            type: "point",
            longitude: order.or_longitude,
            latitude: order.or_latitude,
          };
          const originSymbol = {
            type: "simple-marker",
            color: "blue",
            size: "12px",
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
          };
          const originGraphic = new Graphic({
            geometry: originPoint,
            symbol: originSymbol,
          });
          const destinationPoint = {
            type: "point",
            longitude: orderById.origins.longitude,
            latitude: orderById.origins.latitude,
          };
          const destinationSymbol = {
            type: "simple-marker",
            color: "green",
            size: "12px",
            outline: {
              color: [255, 255, 255],
              width: 2,
            },
          };
          const destinationGraphic = new Graphic({
            geometry: destinationPoint,
            symbol: destinationSymbol,
          });
          view.graphics.addMany([originGraphic, destinationGraphic]);
          const extent = new Extent({
            xmin: Math.min(
              originGraphic.geometry.longitude,
              destinationGraphic.geometry.longitude
            ),
            ymin: Math.min(
              originGraphic.geometry.latitude,
              destinationGraphic.geometry.latitude
            ),
            xmax: Math.max(
              originGraphic.geometry.longitude,
              destinationGraphic.geometry.longitude
            ),
            ymax: Math.max(
              originGraphic.geometry.latitude,
              destinationGraphic.geometry.latitude
            ),
            spatialReference: { wkid: 4326 },
          });
          view.extent = extent.expand(1.5);
          const path = coordinates[index].map((coord) => {
            return [coord[0], coord[1]];
          });
          const routeSymbol = {
            type: "simple-line",
            color: [0, 0, 255, 0.8],
            width: 4,
          };
          const routeGraphic = new Graphic({
            geometry: {
              type: "polyline",
              paths: [path],
            },
            symbol: routeSymbol,
          });
          view.graphics.add(routeGraphic);
        });
      });
    }
  }, [coordinates, view]);

  return (
    <>
      <Navbar navClass={"bg-earth border-gray-200 z-10"} />
      <div className="p-10 bg-earth5 h-screen">
        <Tabs
          defaultValue="pending"
          className="w-full"
          onValueChange={(value) => setIsOpenTab(value)}
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="on-going">On-going</TabsTrigger>
            <TabsTrigger value="finished">Finished</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          {orderById?.order?.Order?.map((item, index) => {
            if (item?.or_status_payment === "pending") {
              const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
              return (
                <TabsContent value="pending" key={index}>
                  <Accordion
                    type="single"
                    collapsible
                    onValueChange={(value) => setIsOpenTab(value === "item-1")}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex justify-between items-center w-full p-4 bg-yellow-100 rounded-lg shadow-sm">
                          <h1 className="text-sm lg:text-2xl font-semibold text-yellow-800 flex items-center gap-2">
                            <ClockIcon className="w-6 h-6 text-yellow-600" />
                            ORDER-{item.or_id}
                          </h1>
                          <p className="text-gray-700 text-sm lg:text-xl">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                          <div className="w-full md:w-1/2 p-8">
                            <ul className="overflow-y-auto max-h-[300px] space-y-6">
                              {menus.map((menu, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between items-center"
                                >
                                  <div className="flex items-center gap-4">
                                    <img
                                      className="w-20 h-20 rounded-lg object-cover"
                                      src={`${menu?.image}`}
                                      alt="Menu item"
                                    />
                                    <h1 className="text-xl font-semibold text-gray-800">
                                      {menu?.name}
                                    </h1>
                                  </div>
                                  <p className="text-lg text-gray-700">
                                    {menu?.price} x {menu?.quantity}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                            <div className="space-y-4">
                              <h1 className="text-2xl font-bold text-gray-800">
                                Total Price: {formatPrice(item?.or_total_price)}
                              </h1>
                              <h1 className="text-xl text-gray-600">
                                {isNaN(Number(item?.or_site))
                                  ? "Delivery: " + item?.or_site
                                  : "Dine In: " + item?.or_site}
                              </h1>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                onClick={() => cancelPayments(item?.or_id)}
                                size="lg"
                                className="bg-red-600 text-white text-xl font-bold"
                              >
                                <MessageCircleX /> Cancel
                              </Button>
                              <Button
                                onClick={() =>
                                  handlePayment(
                                    item?.or_id,
                                    item?.or_total_price
                                  )
                                }
                                size="lg"
                                className="bg-yellow-600 text-white text-xl font-bold"
                              >
                                <Wallet /> Payment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              );
            }
          })}

          {orderById?.order?.Order?.map((item, index) => {
            if (
              item?.or_status_shipping === "ongoing" &&
              item?.or_type_order === "Delivery" &&
              item?.or_status_payment === "settlement"
            ) {
              const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
              return (
                <TabsContent value="on-going" key={index}>
                  <Accordion
                    type="single"
                    collapsible
                    onValueChange={(value) => setIsOpenTab(value === "item-1")}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex justify-between items-center w-full p-4 bg-blue-100 rounded-lg shadow-sm">
                          <h1 className="text-sm lg:text-2xl font-semibold text-blue-800 flex items-center gap-2">
                            <TruckIcon className="w-6 h-6 text-blue-600" />
                            ORDER-{item.or_id}
                          </h1>
                          <p className="text-gray-700 text-sm lg:text-xl">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                          <div
                            className="w-full md:w-1/2 p-8 rounded-md"
                            ref={mapRef}
                          />
                          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                            <ul className="overflow-y-auto max-h-[300px] space-y-6">
                              {menus.map((menu, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between items-center mb-4"
                                >
                                  <div className="flex items-center gap-4">
                                    <img
                                      className="w-20 h-20 rounded-lg object-cover"
                                      src={`${menu?.image}`}
                                      alt="Menu item"
                                    />
                                    <h1 className="text-xl font-semibold text-gray-800">
                                      {menu?.name}
                                    </h1>
                                  </div>
                                  <p className="text-lg text-gray-700">
                                    {formatPrice(menu?.price)} x{" "}
                                    {menu?.quantity}
                                  </p>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 space-y-4">
                              <h1 className="text-2xl font-bold text-gray-800">
                                Total Price: {formatPrice(item?.or_total_price)}
                              </h1>
                              <p className="text-xl text-gray-600">
                                Delivery on: {item?.or_site}
                              </p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              );
            }
          })}

          {orderById?.order?.Order?.map((item, index) => {
            if (
              item?.or_status_shipping === "delivered" &&
              item?.or_status_payment === "settlement"
            ) {
              const menus = JSON.parse(item?.OrderDetail[0].od_mn_json);
              return (
                <TabsContent value="finished" key={index}>
                  <Accordion
                    type="single"
                    collapsible
                    onValueChange={(value) => setIsOpenTab(value === "item-1")}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex justify-between items-center w-full p-4 bg-green-100 rounded-lg shadow-sm">
                          <h1 className="text-sm lg:text-2xl font-semibold text-green-800 flex items-center gap-2">
                            <CheckCircleIcon className="w-6 h-6 text-green-600" />
                            ORDER-{item.or_id}
                          </h1>
                          <p className="text-gray-700 text-sm lg:text-xl">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                          <div className="w-full md:w-1/2 p-8">
                            <ul className="overflow-y-auto max-h-[300px] space-y-4">
                              {menus.map((menu, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between items-center"
                                >
                                  <div className="flex items-center gap-4">
                                    <img
                                      className="w-20 h-20 rounded-lg object-cover"
                                      src={`${menu?.image}`}
                                      alt="Menu item"
                                    />
                                    <h1 className="text-lg font-semibold text-gray-800">
                                      {menu?.name}
                                    </h1>
                                  </div>
                                  <p className="text-lg text-gray-700">
                                    {menu?.price} x {menu?.quantity}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                            <h1 className="text-2xl font-bold text-green-800">
                              Total Price: {formatPrice(item?.or_total_price)}
                            </h1>
                            <p className="text-xl text-gray-600">
                              Delivery on: {item?.or_site}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              );
            }
          })}

          {orderById?.order?.Order?.map((item, index) => {
            if (
              item?.or_status_payment === "expired" ||
              (item?.or_status_payment === "cancel" &&
                item?.or_status_shipping === "cancelled")
            ) {
              const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
              return (
                <TabsContent value="failed" key={index}>
                  <Accordion
                    type="single"
                    collapsible
                    onValueChange={(value) => setIsOpenTab(value === "item-1")}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex justify-between items-center w-full p-4 bg-red-100 rounded-lg shadow-sm">
                          <h1 className="text-sm lg:text-2xl font-semibold text-red-800 flex items-center gap-2">
                            <CircleAlert className="w-6 h-6 text-red-600" />
                            ORDER-{item.or_id}
                          </h1>
                          <p className="text-gray-700 text-sm lg:text-xl">
                            {formatDate(item.createdAt)}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
                          <div className="w-full md:w-1/2 p-8">
                            <ul className="overflow-y-auto max-h-[300px] space-y-4">
                              {menus.map((menu, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between items-center"
                                >
                                  <div className="flex items-center gap-4">
                                    <img
                                      className="w-20 h-20 rounded-lg object-cover"
                                      src={`${menu?.image}`}
                                      alt="Menu item"
                                    />
                                    <h1 className="text-lg font-semibold text-gray-800">
                                      {menu?.name}
                                    </h1>
                                  </div>
                                  <p className="text-lg text-gray-700">
                                    {menu?.price} x {menu?.quantity}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                            <h1 className="text-2xl font-bold text-red-800">
                              Total Price: {formatPrice(item?.or_total_price)}
                            </h1>
                            <p className="text-xl text-gray-600">
                              Delivery on: {item?.or_site}
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              );
            }
          })}
        </Tabs>
      </div>
    </>
  );
}

export default Order;
