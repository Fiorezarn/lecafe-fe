import Navbar from "@/components/navbar/Navbar";
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
import { formatPrice } from "@/lib/utils";

function Order() {
  const dispatch = useDispatch();
  const { orderById } = useSelector((state) => state.order);
  const { cookie } = useSelector((state) => state.auth);
  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTab, setIsOpenTab] = useState(false);
  const id = cookie?.us_id;
  const BASE_URL = import.meta.env.VITE_BASE_URL_BE;

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        basemap: "hybrid",
      });

      const mapView = new MapView({
        map: map,
        container: mapRef.current,
        center: [106.845, -6.207],
        zoom: 12,
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
    dispatch({ type: "auth/getCookie" });
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "order/getAllOrder", payload: id });
  }, [id]);

  return (
    <>
      <Navbar navbarClass="w-full py-6 px-24 flex justify-between items-center bg-earth" />
      <div className="p-10">
        <Tabs
          defaultValue="pending"
          className="w-full"
          onValueChange={(value) => setIsOpenTab(value)}
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="succed">Succed</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          {orderById?.Order?.map((item, index) => {
            if (item.or_status_payment === "Pending") {
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
                                        src={`${BASE_URL}/${menu?.image}`}
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
            if (item.or_status_payment === "Succed") {
              const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
              return (
                <TabsContent value="succed" key={index}>
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
                                        src={`${BASE_URL}/${menu?.image}`}
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
            if (item.or_status_payment === "Failed") {
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
                                        src={`${BASE_URL}/${menu?.image}`}
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
        </Tabs>
      </div>
    </>
  );
}

export default Order;
