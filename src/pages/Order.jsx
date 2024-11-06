import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "../assets/images/hero.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { formatDate, formatPrice } from "@/lib/utils";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";

function Order() {
  const dispatch = useDispatch();
  const { orderById, coordinates, messageOrder } = useSelector(
    (state) => state.order
  );
  const { cookie } = useSelector((state) => state.auth);
  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTab, setIsOpenTab] = useState(false);
  const id = cookie?.us_id;

  useEffect(() => {
    if (messageOrder) {
      toast.success(messageOrder);
    }
  }, [messageOrder]);

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
        (coordinate) => coordinate.destinationLatitude !== null && coordinate.destinationLongitude !== null
      );
  
      console.log(orderCoordinates);
      if (orderCoordinates.length > 0) {
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
      <Navbar navClass={"bg-earth border-gray-200 z-10"}/>
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
            if (item?.or_status_payment === "Pending") {
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
                        <div className="flex justify-between items-center w-full p-4 bg-gray-100 rounded-lg shadow-sm">
                          <h1 className="text-2xl font-semibold text-gray-800">
                            ORDER-{item.or_id}
                          </h1>
                          <p className="text-gray-600">
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
                            <Button
                              size="lg"
                              className="bg-earth text-xl font-bold"
                            >
                              <Wallet /> Payment
                            </Button>
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
              item?.or_status_shipping === "On-going" &&
              item?.or_type_order === "Delivery" &&
              item?.or_status_payment === "Success"
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
                        <div className="flex justify-between items-center w-full">
                          <h1 className="text-3xl">ORDER-{item.or_id}</h1>
                          <p>{item.createdAt}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex">
                          <div className="w-1/2 rounded-md" ref={mapRef}></div>
                          <div className="w-1/2 p-10 flex flex-col justify-between">
                            <ul className="overflow-y-auto h-[300px]">
                              {menus.map((menu, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="flex justify-between items-center mb-4"
                                  >
                                    <div className="flex items-center gap-4">
                                      <img
                                        className="w-[100px]"
                                        src={`${menu?.image}`}
                                        alt="heroImage"
                                      />
                                      <h1 className="text-3xl">{menu?.name}</h1>
                                    </div>
                                    <p className="text-xl">
                                      {formatPrice(menu?.price)} x
                                      {menu?.quantity}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                            <div>
                              <h1 className="text-3xl">
                                Total Price: {formatPrice(item?.or_total_price)}
                              </h1>
                              <h1 className="text-3xl">
                                Delivery on: {item?.or_site}
                              </h1>
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
          {orderById?.Order?.map((item, index) => {
            if (
              item?.or_status_shipping === "Delivered" &&
              item?.or_status_shipping === "Delivered"
            ) {
              const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
              return (
                <TabsContent value="finished" key={index}>
                  <Accordion
                    type="single"
                    collapsible
                    onValueChange={(value) => setIsOpenTab(value === "item-1")}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex justify-between items-center w-full">
                          <h1 className="text-3xl">ORDER-{item.or_id}</h1>
                          <p>{item.createdAt}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex">
                          {/* <div className="w-1/2 rounded-md" ref={mapRef}></div> */}
                          <div className="w-1/2 p-10 flex flex-col justify-between">
                            <ul className="overflow-y-auto h-[300px]">
                              {menus.map((menu, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="flex justify-between items-center mb-4"
                                  >
                                    <div className="flex items-center gap-4">
                                      <img
                                        className="w-[100px]"
                                        src={`${menu?.image}`}
                                        alt="heroImage"
                                      />
                                      <h1 className="text-3xl">{menu?.name}</h1>
                                    </div>
                                    <p className="text-xl">
                                      {menu?.price} x {menu?.quantity}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                            <div>
                              <h1 className="text-3xl">
                                Total Price: {item?.or_total_price}
                              </h1>
                              <h1 className="text-3xl">
                                Delivery on: {item?.or_site}
                              </h1>
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
          {orderById?.Order?.map((item, index) => {
            if (item?.or_status_payment === "Failed") {
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
                        <div className="flex justify-between items-center w-full">
                          <h1 className="text-3xl">ORDER-{item.or_id}</h1>
                          <p>{item.createdAt}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex">
                          {/* <div className="w-1/2 rounded-md" ref={mapRef}></div> */}
                          <div className="w-1/2 p-10 flex flex-col justify-between">
                            <ul className="overflow-y-auto h-[300px]">
                              {menus.map((menu, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="flex justify-between items-center mb-4"
                                  >
                                    <div className="flex items-center gap-4">
                                      <img
                                        className="w-[100px]"
                                        src={`${menu?.image}`}
                                        alt="heroImage"
                                      />
                                      <h1 className="text-3xl">{menu?.name}</h1>
                                    </div>
                                    <p className="text-xl">
                                      {menu?.price} x {menu?.quantity}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                            <div>
                              <h1 className="text-3xl">
                                Total Price: {item?.or_total_price}
                              </h1>
                              <h1 className="text-3xl">
                                Delivery on: {item?.or_site}
                              </h1>
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
        </Tabs>
      </div>
    </>
  );
}

export default Order;
