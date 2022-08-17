import { FC } from "react";
import { useSelector } from "../../services/hooks";
import { Route, Redirect, RouteProps } from "react-router-dom";

export const AnonimusRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state) => state.user);

  if (isAuth) {
    <Redirect
      to={{
        pathname: "/",
      }}
    />;
  }

  return <Route {...rest}>{children}</Route>;
};
