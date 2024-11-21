import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate, formatPrice } from "@/lib/utils";
import { TruckIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import NoData from "@/components/orderStatus/NoData";
import AccordionSkeleton from "./AccordionSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

function OnGoing({ orders }) {
  const [isOpen, setIsOpen] = useState({});
  const mapRefs = useRef([]);
  const dispatch = useDispatch();
  const { orderById, coordinates, loading } = useSelector(
    (state) => state.order
  );
  useEffect(() => {
    if (orders) {
      orders.map((order, index) => {
        if (isOpen[index] && mapRefs.current[index] && coordinates) {
          const map = new Map({
            basemap: "streets-navigation-vector",
          });

          const mapView = new MapView({
            map: map,
            container: mapRefs.current[index],
            center: [106.7829375, -6.2443009],
            zoom: 15,
          });

          const originPoint = {
            type: "point",
            longitude: order.or_longitude,
            latitude: order.or_latitude,
          };
          const destinationPoint = {
            type: "point",
            longitude: orderById.origins.longitude,
            latitude: orderById.origins.latitude,
          };

          const originGraphic = new Graphic({
            geometry: originPoint,
            symbol: {
              type: "picture-marker",
              url: "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1731410974/store_wxaob8.png",
              width: "30px",
              height: "30px",
              outline: {
                color: [255, 255, 255],
                width: 2,
              },
            },
          });
          const destinationGraphic = new Graphic({
            geometry: destinationPoint,
            symbol: {
              type: "picture-marker",
              url: "https://res.cloudinary.com/dsxnvgy7a/image/upload/v1731410682/motorcycle_l2iuvl.png",
              width: "30px",
              height: "30px",
              outline: {
                color: [255, 255, 255],
                width: 2,
              },
            },
          });

          mapView.graphics.addMany([originGraphic, destinationGraphic]);

          const extent = new Extent({
            xmin: Math.min(originPoint.longitude, destinationPoint.longitude),
            ymin: Math.min(originPoint.latitude, destinationPoint.latitude),
            xmax: Math.max(originPoint.longitude, destinationPoint.longitude),
            ymax: Math.max(originPoint.latitude, destinationPoint.latitude),
            spatialReference: { wkid: 4326 },
          });
          mapView.extent = extent.expand(1.5);
          const coordinate = coordinates.find(
            (coordinate) => coordinate.id === index
          );

          const path = coordinate?.coord?.map((coord) => [coord[0], coord[1]]);
          if (path) {
            const routeGraphic = new Graphic({
              geometry: {
                type: "polyline",
                paths: [path],
              },
              symbol: {
                type: "simple-line",
                color: [0, 0, 255, 0.8],
                width: 4,
              },
            });
            mapView.graphics.add(routeGraphic);
          }
        }
      });
    }
  }, [isOpen, orders, coordinates, orderById]);

  useEffect(() => {
    if (orderById && orders) {
      const orderCoordinates = orders
        .map((order, index) => ({
          id: index,
          destinationLongitude: order.or_longitude,
          destinationLatitude: order.or_latitude,
          originLatitude: orderById.origins.latitude,
          originLongitude: orderById.origins.longitude,
        }))
        .filter(
          (coordinate) =>
            coordinate.destinationLatitude !== null &&
            coordinate.destinationLongitude !== null
        );
      if (orderCoordinates?.length > 0) {
        dispatch({ type: "map/fetchCoordinates", payload: orderCoordinates });
      }
    }
  }, [orderById]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <AccordionSkeleton key={index} />
        ))}
      </div>
    );
  }

  const handleOpenAccordion = (index) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (!orders || orders.length === 0) {
    return (
      <NoData
        title={"No Ongoing Orders"}
        paragraph={
          "You currently have no ongoing orders. Check back here to track active orders."
        }
      />
    );
  }

  return orders.map((item, index) => {
    const menus = JSON.parse(item.OrderDetail[0].od_mn_json);

    return (
      <Accordion key={item.or_id} type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger onClick={() => handleOpenAccordion(index)}>
            <div className="flex justify-between items-center w-full p-4 bg-blue-100 rounded-lg shadow-sm">
              <h1 className="text-sm lg:text-2xl no-underline font-semibold text-blue-800 flex items-center gap-2">
                <TruckIcon className="w-6 h-6 text-blue-600" />
                ORDER-{item.or_id}
              </h1>
              <p className="text-gray-700 text-sm lg:text-xl">
                {formatDate(item.createdAt)}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col md:flex-row bg-earth6 shadow-lg rounded-lg overflow-hidden border-2 border-earth1">
              <div
                className="w-full h-[400px] md:h-[500px] md:w-1/2 p-2 rounded"
                ref={(el) => (mapRefs.current[index] = el)}
              />
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-earth4/10">
                <div className="space-y-6">
                  <h3 className="text-earth text-xl font-semibold">
                    Order Details
                  </h3>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {menus.map((menu) => (
                        <div key={menu.id} className="group">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-earth4/30 transition-all duration-300 hover:bg-earth4/50">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                                <img
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  src={menu?.image}
                                  alt={menu?.name || "Menu item"}
                                />
                              </div>
                              <div>
                                <h4 className="text-earth font-medium text-sm md:text-base lg:text-lg truncate max-w-[150px]">
                                  {menu?.name}
                                </h4>
                                <p className="text-earth1 text-xs md:text-sm mt-1">
                                  {formatPrice(menu?.price)} x {menu?.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="text-earth2 text-sm md:text-base lg:text-lg font-medium">
                              {formatPrice(menu?.price * menu?.quantity)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
                <div className="mt-6 space-y-4 bg-earth6 rounded-lg p-4 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-earth1 text-base md:text-lg">
                      Total Price
                    </span>
                    <span className="text-earth text-base md:text-lg font-bold">
                      {formatPrice(item?.or_total_price)}
                    </span>
                  </div>
                  <Separator className="bg-earth3/50" />
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-earth1 text-sm md:text-base">
                        Delivery Address
                      </span>
                      <span className="text-earth text-sm md:text-base">
                        {item?.or_site}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-earth1 text-sm md:text-base">
                        Payment Method
                      </span>
                      <span className="text-earth text-sm md:text-base">
                        {item?.payment_method}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  });
}

export default OnGoing;
