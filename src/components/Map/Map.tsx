import useMap from '../hooks/use-map';
import { useRef, useEffect } from 'react';
import { ListOffers } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';

import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { useAppSelector } from '../hooks';

type MapProps = {
  listOffers: ListOffers;
  hoveredOfferId: string;
  className: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({ listOffers, hoveredOfferId, className }: MapProps): JSX.Element {

  const selectedPoint = listOffers.find((point) => point.id === hoveredOfferId);

  const city = useAppSelector((state) => state.city);

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      listOffers.forEach(({ id, location }) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && selectedPoint.id === id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);

      });

    }
  }, [map, listOffers, selectedPoint]);

  return (
    <section className={`${className}`} ref={mapRef}></section>
  );

}

export default Map;
