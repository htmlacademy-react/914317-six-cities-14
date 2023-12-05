import { useNavigate, useParams } from 'react-router-dom';
import OfferReviewsList from '../../components/Offer/offer-reviews-list';
import OffersNear from '../../components/OffersNeibourghood/offers-neibourghood';
import MapProxy from '../../components/Map/map-proxy';
import { getOfferCommentsAction, getOfferDataAction, getOfferNeibourghoodAction, postFavoriteAction } from '../../store/api-action';
import { useAppDispatch, useAppSelector } from '../Hooks';
import OfferGallery from './offer-gallery';
import OfferGood from './offer-good';
import OfferHost from './offer-host';
import { AppRoute, AuthState } from '../../const';
import { changeFullOffer, changeOffers } from '../../store/action';

function Offer(): JSX.Element {

  const navigate = useNavigate();
  const params = useParams();
  const currentId = params.id;

  const dispatch = useAppDispatch();
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const userAuthStatus = useAppSelector((state) => state.authorizationStatus);
  const listOffers = useAppSelector((state) => state.filtredOffers);

  if (currentOffer === undefined || currentOffer.id !== currentId) {
    dispatch(getOfferDataAction({ id: currentId }));
    dispatch(getOfferCommentsAction({ id: currentId }));
    dispatch(getOfferNeibourghoodAction({ id: currentId }));
  }

  const comments = useAppSelector((state) => state.currentOfferComments);
  const offersInNeibourghood = useAppSelector((state) => state.offersNeibourghood);

  const images = currentOffer.images;
  const goods = currentOffer.goods;
  const host = currentOffer.host;

  const handleItemHover = () => { };

  function getMarkupByIsPremium(isPremium: boolean) {
    switch (isPremium) {
      case true:
        return (
          <div className="offer__mark">
            <span>Premium</span>
          </div>);
      case false: return '';
    }
  }

  function getAdultsMarkup(maxAdults: number) {

    switch (maxAdults) {
      case (maxAdults = 1):
        return (
          <li className="offer__feature offer__feature--adults">
            {`Max ${currentOffer.maxAdults} adult`}
          </li>);
      default: return (
        <li className="offer__feature offer__feature--adults">
          {`Max ${currentOffer.maxAdults} adults`}
        </li>);
    }
  }

  function getBedroomMarkup(bedrooms: number) {

    switch (bedrooms) {
      case (bedrooms = 1):
        return (
          <li className="offer__feature offer__feature--bedrooms">
            {currentOffer.bedrooms} Bedroom
          </li>);
      default: return (
        <li className="offer__feature offer__feature--bedrooms">
          {currentOffer.bedrooms} Bedrooms
        </li>);
    }
  }

  function calculatefavoriteStatus(status: boolean) {
    switch (status) {
      case true:
        return 0;
      case false: return 1;
    }
  }

  function goToLoginPage(){
    navigate(AppRoute.Login);
  }

  function postFavorite() {
    const offerId = currentId;
    const status = calculatefavoriteStatus(currentOffer.isFavorite);
    dispatch(postFavoriteAction({ offerId, status }));
    dispatch(changeFullOffer({ ...currentOffer, isFavorite: !currentOffer.isFavorite }));

    const updatedlist = [...listOffers].map((item) => {
      if (item.id === offerId){
        return {...item,isFavorite: !item.isFavorite};
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

  function getMarkupByIsfavourite(isFavourite: boolean) {
    switch (isFavourite) {
      case true:
        return (
          <button className="offer__bookmark-button offer__bookmark-button--active button" type="button" onClick={handleClick}>
            <svg className="offer__bookmark-icon" width={31} height={33}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>);
      case false: return (
        <button className="offer__bookmark-button button" type="button" onClick={handleClick}>
          <svg className="offer__bookmark-icon" width={31} height={33}>
            <use xlinkHref="#icon-bookmark" />
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      );
    }
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            <OfferGallery
              images={images}
            />
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {getMarkupByIsPremium(currentOffer.isPremium)}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {currentOffer.title}
              </h1>
              {getMarkupByIsfavourite(currentOffer.isFavorite)}
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${Math.round(currentOffer.rating) * 100 / 5}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{`${currentOffer.rating}`}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{`${capitalizeFirstLetter(currentOffer.type)}`}</li>
              {getBedroomMarkup(currentOffer.bedrooms)}
              {getAdultsMarkup(currentOffer.maxAdults)}
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{`${currentOffer.price}`}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                <OfferGood
                  goods={goods}
                />
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <OfferHost
                host={host}
              />
              <div className="offer__description">
                <p className="offer__text">
                  {`${currentOffer.description}`}
                </p>
              </div>
            </div>
            <OfferReviewsList
              comments={comments}
              currentId={currentId}
            />
          </div>
        </div>
        <div className="cities__right-section">
          <MapProxy
            listOffers={offersInNeibourghood}
            hoveredOfferId={currentOffer.id}
            className='offer__map'
          />
        </div>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <OffersNear
            offersInNeibourghood={offersInNeibourghood}
            isNeibourgh
            onItemHover={handleItemHover}
          />
        </section>
      </div>
    </main>
  );
}

export default Offer;
