import { Link } from 'react-router-dom';
import FavouriteButtonList from '../favourite-button-list/favourite-button-list';
import { ListOffer } from '../../types/offer';

type ListCardProps = {
  item: ListOffer;
  isFavouriteSection: boolean;
}


function ListCard({ item, isFavouriteSection }: ListCardProps): JSX.Element {

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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

  function getWidthSizeByIsfavorite(favorite: boolean) {

    switch (favorite) {
      case true:
        return '150';
      case false: return '260';
    }

  }

  function getHeigthSizeByIsfavorite(favorite: boolean) {

    switch (favorite) {
      case true:
        return '110';
      case false: return '200';
    }

  }

  function getMarkupPreviewByIsfavorite(favorite: boolean) {

    switch (favorite) {
      case true:
        return 'favorites';
      case false: return 'cities';
    }

  }

  function getMarkupCardInfoByIsfavorite(favorite: boolean) {

    switch (favorite) {
      case true:
        return 'favorites__card-info';
      case false: return '';
    }

  }


  return (

    <>
      {getMarkupByIsPremium(item.isPremium)}
      <div className={`${getMarkupPreviewByIsfavorite(isFavouriteSection)}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img className="place-card__image" src={`${item.previewImage}`} width={`${getWidthSizeByIsfavorite(isFavouriteSection)}`} height={`${getHeigthSizeByIsfavorite(isFavouriteSection)}`} alt="Place image" />
        </a>
      </div>
      <div className={`${getMarkupCardInfoByIsfavorite(isFavouriteSection)} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{item.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavouriteButtonList
            isFavorite={item.isFavorite}
            offerId={item.id}
          />
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
        <p className="place-card__type">{`${capitalizeFirstLetter(item.type)}`}</p>
      </div>
    </>
  );
}

export default ListCard;
