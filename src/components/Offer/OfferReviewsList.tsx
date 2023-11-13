import { Comments } from '../../types/offer';
import OfferReview from '../../components/Offer/OfferReview';
import OfferForm from './OfferForm';

type OfferReviewsProps = {
  comments: Comments;
}

function OfferReviewsList({ comments }: OfferReviewsProps): JSX.Element {

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">1</span>
      </h2>
      <ul className="reviews__list">
        <OfferReview comments = {comments}/>
      </ul>
      <OfferForm/>
    </section>
  );
}

export default OfferReviewsList;
