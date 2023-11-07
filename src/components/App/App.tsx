import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import OfferPage from '../../pages/offer/offer';
import FavouritesPage from '../../pages/favourites/favourites';
import ErrorPage from '../../pages/error/error';

import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthState, AppRoute } from '../../const';
import { Offers } from '../../types/offer';

type AppProps = {
  cardsCount: number;
  offers: Offers;
}

function App({ cardsCount, offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage
              cardsCount={cardsCount}
              offers={offers}
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
                offers={offers}
              />
            }
          />
        </Route>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthState.Auth}>
              <FavouritesPage
                offers={offers}
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
