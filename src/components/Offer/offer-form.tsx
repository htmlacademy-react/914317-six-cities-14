import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postCommentAction } from '../../store/api-action';
import { AuthState } from '../../const';

type offerFormProps = {
  currentId: string | undefined;
}

function OfferForm({ currentId }: offerFormProps): JSX.Element {

  const [formData, setFormData] = useState({
    offerId: currentId,
    comment: '',
    rating: 0
  });

  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFormSending = useAppSelector((state) => state.isFormSending);

  function getMarkupByAuthorizationStatus(authStatus: AuthState) {

    if (authStatus === AuthState.Auth) {

      if (formData.comment.length >= 50 && formData.comment.length <= 300 && isFormSending === false) {

        return (
          <button
            className="reviews__submit form__submit button"
            type="submit"
          >
            Submit
          </button>
        );
      } else {

        return (
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled
          >
            Submit
          </button>
        );
      }

    } else {

      return (
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      );
    }

  }

  const onHandleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const rating = Number(evt.target.value);
    setFormData((prevState) => ({ ...prevState, rating }));
  };

  const onHandleTextAreaChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = evt.target.value;
    setFormData((prevState) => ({ ...prevState, comment }));
  };

  const onHandleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postCommentAction(formData));
  };

  return (
    <form className="reviews__form form" onSubmit={onHandleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={5}
          id="5-stars"
          type="radio"
          onChange={onHandleFieldChange}
        />
        <label
          htmlFor="5-stars"
          className="reviews__rating-label form__rating-label"
          title="perfect"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={4}
          id="4-stars"
          type="radio"
          onChange={onHandleFieldChange}
        />
        <label
          htmlFor="4-stars"
          className="reviews__rating-label form__rating-label"
          title="good"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={3}
          id="3-stars"
          type="radio"
          onChange={onHandleFieldChange}
        />
        <label
          htmlFor="3-stars"
          className="reviews__rating-label form__rating-label"
          title="not bad"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={2}
          id="2-stars"
          type="radio"
          onChange={onHandleFieldChange}
        />
        <label
          htmlFor="2-stars"
          className="reviews__rating-label form__rating-label"
          title="badly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          defaultValue={1}
          id="1-star"
          type="radio"
          onChange={onHandleFieldChange}
        />
        <label
          htmlFor="1-star"
          className="reviews__rating-label form__rating-label"
          title="terribly"
        >
          <svg className="form__star-image" width={37} height={33}>
            <use xlinkHref="#icon-star" />
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        minLength={50}
        maxLength={300}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={onHandleTextAreaChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{''}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{''}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        {getMarkupByAuthorizationStatus(authorizationStatus)}
      </div>
    </form>
  );
}

export default OfferForm;
