import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import OfferPage from '../../pages/offer/offer';
import FavouritesPage from '../../pages/favourites/favourites';
import ErrorPage from '../../pages/error/error';

import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthState, AppRoute } from '../../const';
import { FullOffers,ListOffers,OffersInNeibourghood } from '../../types/offer';
import { Comments } from '../../types/offer';

type AppProps = {
  cardsCount: number;
  fullOffers: FullOffers;
  listOffers: ListOffers;
  comments: Comments;
  offersInNeibourghood: OffersInNeibourghood;
}

function App({ cardsCount, fullOffers, listOffers, comments, offersInNeibourghood }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              cardsCount={cardsCount}
              fullOffers = {fullOffers}
              listOffers = {listOffers}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route path={AppRoute.Offer}>
          <Route
            path=":id"
            element={
              <OfferPage
                fullOffers={fullOffers}
                comments = {comments}
                offersInNeibourghood = {offersInNeibourghood}
              />
            }
          />
        </Route>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthState.Auth}>
              <FavouritesPage
                fullOffers={fullOffers}
              />
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={<ErrorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
