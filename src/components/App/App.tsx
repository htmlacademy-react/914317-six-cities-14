import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import OfferPage from '../../pages/offer/offer';
import FavouritesPage from '../../pages/favourites/favourites';
import ErrorPage from '../../pages/error/error';

import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthState, AppRoute } from '../../const';

type AppProps = {
  cardsCount: number;
}

function App({ cardsCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage cardsCount={cardsCount} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthState.NoAuth}>
              <FavouritesPage />
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
