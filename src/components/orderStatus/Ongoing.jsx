import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MessageCircleX, TruckIcon, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

function OnGoing({ orders }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTab, setIsOpenTab] = useState(false);
  const mapRef = useRef(null);
  const [view, setView] = useState(null);
  const { orderById, coordinates } = useSelector((state) => state.order);

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

  const ongoingOrders = orders?.filter(
    (order) =>
      order?.or_status_shipping === "ongoing" &&
      order?.or_type_order === "Delivery" &&
      order?.or_status_payment === "settlement"
  );

  if (!ongoingOrders?.length) return <div>Data Kosong</div>;

  return ongoingOrders.map((item, index) => {
    const menus = JSON.parse(item.OrderDetail[0].od_mn_json);
    return (
      <Accordion key={index} type="single" collapsible>
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
              <div className="w-full md:w-1/2 p-8 rounded-md" ref={mapRef} />
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
                        {formatPrice(menu?.price)} x {menu?.quantity}
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
    );
  });
}

export default OnGoing;
