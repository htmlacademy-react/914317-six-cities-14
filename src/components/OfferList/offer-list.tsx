import { ListOffers } from '../../types/offer';
import OfferListCard from '../OfferList/offer-list-card';

type AllOffersProps = {
  listOffers: ListOffers;
  isNeibourgh: boolean;
  onItemHover: (id: string) => void;
}

const getClassByIsNeibourgh = (isNeibourgh: boolean) => {

  switch (isNeibourgh) {
    case false:
      return {
        divClass: 'cities__places-list',
        articleClass: 'cities__card',
        tabsContent: 'tabs__content'
      };
    case true:
      return {
        divClass: 'near-places__list',
        articleClass: 'near-places__card',
        tabsContent: ''
      };
  }

};

function OfferList({ listOffers, isNeibourgh, onItemHover }: AllOffersProps): JSX.Element {


  const className = getClassByIsNeibourgh(isNeibourgh);

  return (
    <div className={`${className.divClass} places__list ${className.tabsContent}`} >
      <OfferListCard
        listOffers={listOffers}
        className = {className.articleClass}
        onMouseMove={onItemHover}
      />
    </div>
  );
}

export default OfferList;
