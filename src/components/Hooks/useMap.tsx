import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { CityMap } from '../../types/offer';
import { Map, TileLayer } from 'leaflet';

type useMapProps = {
  mapRef: MutableRefObject<HTMLElement | null>;
  city: CityMap;
}

function useMap({ mapRef, city }: useMapProps): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(
        mapRef.current,
        {
          center: {
            lat: city.location.latitude,
            lng: city.location.longitude,
          },
          zoom: city.location.zoom,
        }
      );

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;

    } else {
      map?.flyTo(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom
      );
    }
  },
  [map, mapRef, city]);

  return map;

}

export default useMap;
