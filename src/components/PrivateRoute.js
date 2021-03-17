import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ render: reqRender, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  var render = reqRender
  if (!currentUser) {
    render = () => <Redirect to={"/login"} />;
  } else if (currentUser.data === undefined) {
    render = () => <Redirect to={"/register/student-or-teacher"} />;
  }

  return (
    <Route
      {...rest}
      render={render}
    />
  );
};

export default PrivateRoute;
