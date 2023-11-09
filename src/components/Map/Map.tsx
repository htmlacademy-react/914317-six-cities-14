import useMap from '../Hooks/useMap';
import { useRef, useEffect } from 'react';
import { Offers } from '../../types/offer';
import { URL_MARKER_DEFAULT,URL_MARKER_CURRENT } from '../const';

import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';

type MapProps = {
  offers: Offers;
  hoveredOfferId: string;
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

function Map({ offers, hoveredOfferId }: MapProps): JSX.Element {

  const selectedPoint = offers.find((point) => point.id === hoveredOfferId);

  const firstOffer = offers.slice(0, 1)[0];
  const city = firstOffer.city;

  const mapRef = useRef(null);
  const map = useMap({ mapRef, city });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach(({id,location}) => {
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
  }, [map, offers, selectedPoint]);

  return (
    <div className="cities__right-section">
      <section className="cities__map map" ref = {mapRef}></section>
    </div>
  );

}

export default Map;
