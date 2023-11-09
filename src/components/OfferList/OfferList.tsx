import { Offers } from '../../types/offer';
import OfferListCard from '../OfferListCard/OfferListCard';

type AllOffersProps = {
  cardsCount: number;
  offers: Offers;
  onItemHover: (id: string)=> void;
}

function OfferList({ cardsCount, offers, onItemHover }: AllOffersProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content" >
      {cardsCount}
      <OfferListCard
        offers={offers}
        onMouseMove={onItemHover}
      />
    </div>
  );
}

export default OfferList;
