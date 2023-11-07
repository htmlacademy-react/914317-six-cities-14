import { Offers } from '../../types/offer';
import OfferListCard from '../OfferListCard/OfferListCard';
import { useState } from 'react';

type AllOffersProps = {
  cardsCount: number;
  offers: Offers;
}

function OfferList({ cardsCount, offers }: AllOffersProps): JSX.Element {

  const [card, setCardhover] = useState({
    id: 0,
    isHover: false
  });

  return (
    <div className="cities__places-list places__list tabs__content" >
      {cardsCount}
      <OfferListCard
        offers={offers}
        onMouseMove={(id,isHover) => setCardhover({
          ...card,
          id: id,
          isHover: isHover,
        })}
      />
    </div>
  );
}

export default OfferList;
