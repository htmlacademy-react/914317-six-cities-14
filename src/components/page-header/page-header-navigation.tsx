import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthState } from '../../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logoutAction } from '../../store/api-action';

function PageHeaderNavigation(): JSX.Element {

  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.authorizationStatus);
  const favoritesOffersCount = useAppSelector((state) => state.favouriteOffers.length);
  const userEmail = useAppSelector((state) => state.userEmail);

  const dispatch = useAppDispatch();

  const onHandleHeaderClick = () => {
    dispatch(logoutAction());
  };

  function goToLoginPage(){
    navigate(AppRoute.Login);
  }

  function goToFavoritePage(){
    navigate(AppRoute.Favorites);
  }

  const onHandleFavoriteClick = () => {

    switch (isAuth) {
      case AuthState.Auth: return goToFavoritePage();
      default: return goToLoginPage();
    }

  };

  function getMarkupByIsAuth(isAuthorized: AuthState) {
    switch (isAuthorized) {
      case AuthState.Auth: return (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" onClick={onHandleFavoriteClick}>
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">{userEmail}</span>
              <span className="header__favorite-count">{favoritesOffersCount}</span>
            </a>
          </li>
          <li className="header__nav-item">
            <a className="header__nav-link" href="#" onClick={onHandleHeaderClick}>
              <span className="header__signout">Sign out</span>
            </a>
          </li>
        </ul>
      );

      default: return (
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <a className="header__nav-link header__nav-link--profile" href="#">
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">
                <Link to={'/login'} >Sign in</Link>
              </span>
            </a>
          </li>
        </ul>
      );
    }
  }


  return (
    <nav className="header__nav">
      {getMarkupByIsAuth(isAuth)}
    </nav>
  );
}

export default PageHeaderNavigation;
