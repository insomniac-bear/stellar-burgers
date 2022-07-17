import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/use-auth-hook';
import { RequestStatus } from '../../utils/const';
import Preloader from '../preloader/preloader';

export function ProtectedRoute({ children, ...rest }) {
  const { isAuth, authRequest } = useAuth();

  if (authRequest !== RequestStatus.success && authRequest !== RequestStatus.failed) {
    return <Preloader />;
  }

  return (
    <Route
      { ...rest }
      render={({ location }) => isAuth
        ? (
          children
        ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            )
      }
    />
  );
}