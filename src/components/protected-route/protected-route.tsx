import { FC } from "react";
import { Route, Redirect, RouteProps, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth-hook";
import Preloader from "../preloader/preloader";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth, authRequest } = useAuth();
  const location = useLocation();

  if (authRequest === "pending") {
    return <Preloader />;
  }

  if (!isAuth) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
};
