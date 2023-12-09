import { ListOffers } from '../../types/offer';
import ListCard from '../list-card/list-card';

type FavouritesListCardProps = {
  favouriteOffers: ListOffers;
  city: string;
}

function FavouritesListCard({ favouriteOffers, city }: FavouritesListCardProps): JSX.Element {

  const offersForSection = favouriteOffers.filter((item) => item.city.name === city);
  const isFavouriteSection = true;
  return (
    <>
      {offersForSection.map((item) => (
        <article key={item.id} className="favorites__card place-card">
          <ListCard
            item={item}
            isFavouriteSection = {isFavouriteSection}
          />
        </article>
      ))}
    </>
  );


}

export default FavouritesListCard;
