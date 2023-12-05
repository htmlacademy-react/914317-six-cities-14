import { FavouriteOffers } from '../../types/favourite-offer';
import FavouritesListCard from './favourites-list-card';

type FavouritesListProps = {
  favouriteOffers: FavouriteOffers;
}

function FavouritesList({ favouriteOffers }: FavouritesListProps): JSX.Element {

  const cities = [];

  favouriteOffers.forEach((item) => {
    if (cities.find((cityItem) => cityItem === item.city.name) === undefined) {
      cities.push(item.city.name);
    }
  });

  return (
    <>
      {cities.map((item) => (
        <li key = {item} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{item}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            <FavouritesListCard
              favouriteOffers={favouriteOffers}
              city={item}
            />
          </div>
        </li>
      ))}
    </>

  );
}

export default FavouritesList;
