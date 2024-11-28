import { Button } from "../ui/button";
import { Input } from "../ui/input";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import { useEffect, useRef } from "react";
import Graphic from "@arcgis/core/Graphic";
import { Clock, MapPin, Phone } from "lucide-react";

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
    }
  }, []);
  return (
    <section className="bg-earth6 py-16 px-6 md:px-20">
      <h1 className="text-center text-3xl font-sour mb-10">Find Us</h1>
      <div className="flex flex-col-reverse md:flex-row gap-8 justify-center">
        <div
          className="mapDiv rounded-md w-full max-w-[500px] aspect-[4/3] md:w-[50%] md:aspect-auto md:h-[50vh]"
          ref={mapDiv}
        ></div>
        <div className="md:w-[50%] bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-bold text-[#493628] mb-4 font-mono">
            Le Café
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center text-[#6e513c]">
              <MapPin className="mr-2 h-5 w-5 text-[#AB886D]" />
              <span>123 Coffee Street, Jakarta, Indonesia</span>
            </li>
            <li className="flex items-center text-[#6e513c]">
              <Phone className="mr-2 h-5 w-5 text-[#AB886D]" />
              <span>+62 123-456-7890</span>
            </li>
            <li className="flex items-center text-[#6e513c]">
              <Clock className="mr-2 h-5 w-5 text-[#AB886D]" />
              <span>
                Mon-Fri: 7:00 AM - 8:00 PM
                <br />
                Sat-Sun: 8:00 AM - 9:00 PM
              </span>
            </li>
          </ul>
          <p className="mt-6 text-[#6e513c]">
            Visit us for a perfect cup of coffee in a cozy atmosphere. We offer
            a wide variety of coffee blends, pastries, and light meals. Our
            friendly staff is always ready to make your visit memorable!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Subcribe;
