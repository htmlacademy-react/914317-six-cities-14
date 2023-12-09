import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { AppRoute, AuthState } from '../../const';
import { postFavoriteAction } from '../../store/api-action';
import { changeOffers, loadOfferNeibourghood } from '../../store/action';

type FavouriteButtonListProps = {
  isFavorite: boolean;
  offerId: string;
}


function FavouriteButtonList({ isFavorite, offerId }: FavouriteButtonListProps): JSX.Element {

  const userAuthStatus = useAppSelector((state) => state.authorizationStatus);
  const offers = useAppSelector((state) => state.offers);
  const offersNeibourghood = useAppSelector((state) => state.offersNeibourghood);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function getMarkupByIsfavourite(favorite: boolean) {

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
      const status = calculatefavoriteStatus(favorite);
      dispatch(postFavoriteAction({ offerId, status }));

      const updatedlistOffers = [...offers].map((item) => {
        if (item.id === offerId) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      }

      );

      const updatedlistOffersNeibourghood = [...offersNeibourghood].map((item) => {
        if (item.id === offerId) {
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      }
      );

      dispatch(changeOffers(updatedlistOffers));
      dispatch(loadOfferNeibourghood(updatedlistOffersNeibourghood));
    }

    const onHandleClick = () => {

      switch (userAuthStatus) {
        case AuthState.Auth: return postFavorite();
        default: return goToLoginPage();
      }

    };

    switch (isFavorite) {
      case true:
        return (
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={onHandleClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>);
      case false: return (
        <button className="place-card__bookmark-button button" type="button" onClick={onHandleClick}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      );
    }

  }

  const favouriteMarkup = getMarkupByIsfavourite(isFavorite);

  return (
    favouriteMarkup
  );
}

export default FavouriteButtonList;
