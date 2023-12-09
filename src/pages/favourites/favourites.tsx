import FavouritesList from '../../components/favourites-list/favourites-list';
import FavouritesListEmpty from '../../components/favourites-list/favourites-list-empty';
import { useAppSelector } from '../../components/hooks';
import PageHeader from '../../components/page-header/page-header';

function FavouritesPage(): JSX.Element {

  const favouriteOffers = useAppSelector((state) => state.favouriteOffers);

  function getMarkupContainerIsFavouritesExist() {
    if (favouriteOffers.length > 0) {
      return (
        <FavouritesList
          favouriteOffers={favouriteOffers}
        />
      );
    } else {
      return (
        <FavouritesListEmpty />
      );
    }
  }

  function getMarkupPageIsFavouritesExist() {
    if (favouriteOffers.length === 0) {
      return (
        'page--favorites-empty'
      );
    } else {
      return (
        ''
      );
    }
  }


  function getMarkupMainIsFavouritesExist() {
    if (favouriteOffers.length === 0) {
      return (
        'page__main--favorites-empty'
      );
    } else {
      return (
        ''
      );
    }
  }


  return (
    <div className={`page ${getMarkupPageIsFavouritesExist()}`}>
      <PageHeader />
      <main className={`page__main page__main--favorites ${getMarkupMainIsFavouritesExist()}`}>
        <div className="page__favorites-container container">
          {getMarkupContainerIsFavouritesExist()}
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavouritesPage;
