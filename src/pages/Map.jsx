import { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

function MapComponent() {
  const mapRef = useRef(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        basemap: "hybrid",
      });

      setView(
        new MapView({
          map: map,
          container: mapRef.current,
          center: [106.845, -6.207],
        })
      );

      return () => {
        if (view) {
          view.destroy();
        }
      };
    }
  }, []);

  return <div style={{ width: "100%", height: "500px" }} ref={mapRef}></div>;
}

export default MapComponent;
