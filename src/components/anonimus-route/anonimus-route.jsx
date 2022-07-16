import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export function AnonimusRoute({ children, ...rest }) {
  const { isAuth } = useSelector(state => state.user);
  return (
    <Route
      { ...rest }
      render={() =>
        !isAuth ? (
          children
        ) : (
              <Redirect
                to={{
                  pathname: '/',
                }}
              />
            )
      }
    />
  );
}