import MainPage from '../../pages/main/main';
import LoginPage from '../../pages/login/login';
import OfferPage from '../../pages/offer/offer';
import FavouritesPage from '../../pages/favourites/favourites';
import ErrorPage from '../../pages/error/error';
import LoadingScreen from '../loadnigScreen/loadning-screen';

import PrivateRoute from '../PrivateRoute/private-route';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthState, AppRoute } from '../../const';
import { useAppSelector } from '../Hooks';

function App(): JSX.Element {

  const isDataloading = useAppSelector((state) => state.isDataLoading);

  if (isDataloading === true) {
    return (<LoadingScreen />);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <MainPage/>
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
              <OfferPage/>
            }
          />
        </Route>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthState.Auth}>
              <FavouritesPage/>
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
