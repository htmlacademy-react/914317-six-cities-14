import FavouritesList from '../../components/FavouritesList/favourites-list';
import { useAppSelector } from '../../components/Hooks';
import PageHeader from '../../components/PageHeader/page-header';

function FavouritesPage(): JSX.Element {

  const favouriteOffers = useAppSelector((state) => state.favouriteOffers);

  return (
    <div className="page">
      <PageHeader />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <FavouritesList
                favouriteOffers={favouriteOffers}
              />
            </ul>
          </section>
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
