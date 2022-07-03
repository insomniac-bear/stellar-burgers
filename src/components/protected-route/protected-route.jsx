import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
  const { isAuth } = useSelector(state => state.user.data);
  return (
    <Route
      { ...rest }
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location?.state?.from || '/' }
                }}
              />
            )
      }
    />
  );
}