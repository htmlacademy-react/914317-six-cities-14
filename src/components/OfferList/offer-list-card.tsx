import { ListOffer, ListOffers } from '../../types/offer';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Hooks';
import { AppRoute, AuthState } from '../../const';
import { changeOffers } from '../../store/action';
import { postFavoriteAction } from '../../store/api-action';

type OfferListCardProps = {
  listOffers: ListOffers;
  className: string;
  onMouseMove: (id: string) => void;
};

function OfferListCard({ listOffers, className, onMouseMove }: OfferListCardProps): JSX.Element {

  const userAuthStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function getMarkupByIsPremium(isPremium: boolean) {

    switch (isPremium) {
      case true:
        return (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>);
      case false: return '';
    }

  }

  function getMarkupByIsfavourite(currentOffer: ListOffer) {

    const isFavorite = currentOffer.isFavorite;

    function calculatefavoriteStatus(status: boolean) {
      switch (status) {
        case true:
          return 0;
        case false: return 1;
      }
    }

    function goToLoginPage() {
      navigate(AppRoute.Login);
    }

    function postFavorite() {
      const offerId = currentOffer.id;
      const status = calculatefavoriteStatus(isFavorite);
      dispatch(postFavoriteAction({ offerId, status }));

      const updatedlist = [...listOffers].map((item) => {
        if (item.id === offerId) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      }
      );
      dispatch(changeOffers(updatedlist));
    }

    const handleClick = () => {

      switch (userAuthStatus) {
        case AuthState.Auth: return postFavorite();
        default: return goToLoginPage();
      }

    };

    switch (isFavorite) {
      case true:
        return (
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={handleClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>);
      case false: return (
        <button className="place-card__bookmark-button button" type="button" onClick={handleClick}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      );
    }

  }


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
          {getMarkupByIsPremium(item.isPremium)}
          <div className="cities__image-wrapper place-card__image-wrapper">
            <a href="#">
              <img className="place-card__image" src={`${item.previewImage}`} width="260" height="200" alt="Place image" />
            </a>
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;{item.price}</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              {getMarkupByIsfavourite(item)}
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: `${Math.round(item.rating) * 100 / 5}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <Link to={`/offer/${item.id}`}>{item.title}</Link>
            </h2>
            <p className="place-card__type">{item.type}</p>
          </div>
        </article>
      ))}
    </>
  );

}

export default OfferListCard;
