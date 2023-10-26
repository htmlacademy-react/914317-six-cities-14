import { AuthState, AppRoute } from '../../const';
import { Navigate } from 'react-router-dom';


type PrivateRouteProps = {
  authorizationStatus: AuthState;
  children: JSX.Element;
}

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps): JSX.Element {

  return (
    authorizationStatus === AuthState.Auth ? children : <Navigate to={AppRoute.Login} />
  );

}

export default PrivateRoute;
