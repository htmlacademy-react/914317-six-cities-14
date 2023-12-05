import { Comments, User } from '../../types/offer';
import {getDateForMarkup,getDateForComment,sortComments} from './offer-utils';

type OfferReviewsProps = {
  comments: Comments;
}

function getUserName(user: User) {
  return user.name;
}
function getUserUrl(user: User) {
  return user.avatarUrl;
}

function OfferReview({ comments }: OfferReviewsProps): JSX.Element {
  const neededComments = comments.slice();
  neededComments.sort((firstItem, secondItem)=>sortComments(firstItem.date,secondItem.date));
  const commentsForMarkup = neededComments.slice(0,10);
  return (
    <>
      {commentsForMarkup.map((item) => (
        <li key={item.id} className="reviews__item">
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={`${getUserUrl(item.user)}`}
                width={54}
                height={54}
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">{`${getUserName(item.user)}`}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${item.rating * 100 / 5}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              {item.comment}
            </p>
            <time className="reviews__time" dateTime={`${getDateForMarkup(item.date)}`}>
              {`${getDateForComment(item.date)}`}
            </time>
          </div>
        </li>
      ))}
    </>
  );
}

export default OfferReview;
