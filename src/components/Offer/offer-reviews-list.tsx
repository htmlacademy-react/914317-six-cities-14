import { Comments } from '../../types/offer';
import OfferReview from '../../components/offer/offer-review';
import OfferForm from './offer-form';
import { useAppSelector } from '../hooks';
import { AuthState } from '../../const';

type OfferReviewsProps = {
  comments: Comments;
  currentId: string | undefined;
}

function OfferReviewsList({ comments, currentId }: OfferReviewsProps): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  function getMarkupByAuthorizationStatus(authStatus: AuthState) {
    switch (authStatus) {
      case (AuthState.Auth):
        return (
          <OfferForm
            currentId={currentId}
          />
        );
      default: return (
        ''
      );
    }
  }

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{`${comments.length.toString()}`}</span>
      </h2>
      <ul className="reviews__list">
        <OfferReview
          comments={comments}
        />
      </ul>
      {getMarkupByAuthorizationStatus(authorizationStatus)}
    </section>
  );
}

export default OfferReviewsList;
