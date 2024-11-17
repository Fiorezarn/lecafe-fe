import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import { useEffect, useRef } from "react";
import Graphic from "@arcgis/core/Graphic";

function Subcribe() {
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const webmap = new Map({
        basemap: "streets-navigation-vector",
      });

      const view = new MapView({
        map: webmap,
        container: mapDiv.current,
        center: [106.7829375, -6.2443009],
        zoom: 15,
      });

      const storePoint = {
        type: "point",
        longitude: 106.7829375,
        latitude: -6.2443009,
      };

      const pointGraphic = new Graphic({
        geometry: storePoint,
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

      view.graphics.add(pointGraphic);

      return () => view && view.destroy();
    }
  }, []);
  return (
    <section className="bg-earth6 py-16 px-20 items-center flex">
      <div
        className="mapDiv rounded-md"
        ref={mapDiv}
        style={{ height: "50vh", width: "50%" }}
      ></div>
      <div className="container mx-auto px-6 lg:px-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-mono">
          Stay Updated!
        </h2>
        <p className="text-gray-600 text-lg mb-8 font-sour">
          Subscribe to our newsletter and never miss any updates or special
          offers.
        </p>
        <form className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Input
            type="email"
            className="w-full md:w-[400px] px-4 py-2 border font-mono border-gray-300 rounded-md focus:ring-2 focus:ring-earth3 focus:outline-none"
            placeholder="Enter your email address"
            required
          />
          <Button className="px-6 py-2 bg-earth3 text-white font-medium rounded-md hover:bg-earth4 transition-colors duration-300">
            Subscribe
          </Button>
        </form>
        <p className="text-gray-500 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

export default Subcribe;
