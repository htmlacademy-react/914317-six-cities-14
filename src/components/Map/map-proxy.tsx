import Map from './map';
import { ListOffers, OffersInNeibourghood } from '../../types/offer';

type MapProxyProps = {
  listOffers: ListOffers | OffersInNeibourghood;
  hoveredOfferId: string;
  className: string;
}

function MapProxy(props: MapProxyProps) {

  const {className = '', ...restProps} = props;

  return (
    <Map
      className={`${className} map`} {...restProps}
    />
  );
}

export default MapProxy;
