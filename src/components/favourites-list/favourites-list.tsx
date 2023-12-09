import { ListOffers } from '../../types/offer';
import FavouritesListCard from './favourites-list-card';

type FavouritesListProps = {
  favouriteOffers: ListOffers;
}

function FavouritesList({ favouriteOffers }: FavouritesListProps): JSX.Element {

  const cities: string[] = [];

  favouriteOffers.forEach((item) => {
    if (cities.find((cityItem) => cityItem === item.city.name) === undefined) {
      cities.push(item.city.name);
    }
  });

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((item) => (
          <li key={item} className="favorites__locations-items">
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
      </ul>
    </section>

  );
}

export default FavouritesList;
