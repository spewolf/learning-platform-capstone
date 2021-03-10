import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (!currentUser) {
          return <Redirect to={"/login"} />;
        } else if (currentUser.data === undefined) {
          return <Redirect to={"/register/student-or-teacher"} />;
        } else {
          return <Redirect to={"/dashboard"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
