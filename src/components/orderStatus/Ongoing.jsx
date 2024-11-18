import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDate, formatPrice } from "@/lib/utils";
import { MessageCircleX, TruckIcon, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import NoData from "@/components/orderStatus/NoData";
import AccordionSkeleton from "./AccordionSkeleton";

function OnGoing({ orders, isOpenTab }) {
  const [isOpen, setIsOpen] = useState({});
  const mapRefs = useRef([]);
  const mapViews = useRef({});
  const dispatch = useDispatch();
  const { orderById, coordinates, loading } = useSelector(
    (state) => state.order
  );

  // if (loading) {
  //   return (
  //     <div className="space-y-4">
  //       {[...Array(3)].map((_, index) => (
  //         <AccordionSkeleton key={index} />
  //       ))}
  //     </div>
  //   );
  // }

  const handleOpenAccordion = (index) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

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
            <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
              <div
                className="w-full md:w-1/2 p-8 rounded"
                ref={(el) => (mapRefs.current[index] = el)}
              />
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                <ul className="overflow-y-auto max-h-[300px] space-y-6">
                  {menus.map((menu) => {
                    return (
                      <li
                        key={menu.id}
                        className="flex justify-between items-center mb-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            className="w-10 h-10 md:w-20 md:h-20  rounded-lg object-cover"
                            src={`${menu?.image}`}
                            alt="Menu item"
                          />
                          <h1 className="text-xs md:text-sm lg:text-xl font-semibold text-gray-800">
                            {menu?.name}
                          </h1>
                        </div>
                        <p className="text-xs md:text-sm lg:text-xl text-gray-700">
                          {formatPrice(menu?.price)} x {menu?.quantity}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                <div className="mt-4 space-y-4">
                  <h1 className="text-sm md:text-sm lg:text-xl font-bold text-gray-800">
                    Total Price: {formatPrice(item?.or_total_price)}
                  </h1>
                  <p className="text-sm md:text-sm lg:text-xl text-gray-600">
                    Delivery on: {item?.or_site}
                  </p>
                  <p className="text-sm md:text-sm lg:text-xl text-gray-600">
                    Payment Method: {item?.payment_method}
                  </p>
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
