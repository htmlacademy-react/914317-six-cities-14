import { ListOffers } from '../../types/offer';
import ListCard from '../list-card/list-card';

type OfferListCardProps = {
  listOffers: ListOffers;
  className: string;
  onMouseMove: (id: string) => void;
};

function OfferListCard({ listOffers, className, onMouseMove }: OfferListCardProps): JSX.Element {
  const isFavouriteSection = false;
  return (
    <>
      {listOffers.map((item) => (
        <article key={item.id} className={`${className} place-card`}
          onMouseEnter={(evt) => {
            evt.preventDefault();
            onMouseMove(item.id);
          }}
          onMouseLeave={(evt) => {
            evt.preventDefault();
            onMouseMove('');
          }}
        >
          <ListCard
            item={item}
            isFavouriteSection={isFavouriteSection}
          />
        </article>
      ))}
    </>
  );

}

export default OfferListCard;
