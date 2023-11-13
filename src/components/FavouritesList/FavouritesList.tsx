import { FullOffers } from '../../types/offer';
import FavouritesListCard from '../../components/FavouritesListCard/FavouritesListCard';

type FavouritesListProps = {
  fullOffers: FullOffers;
}

function FavouritesList({ fullOffers }: FavouritesListProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>Amsterdam</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <FavouritesListCard
          fullOffers={fullOffers}
        />
      </div>
    </li>
  );
}

export default FavouritesList;
