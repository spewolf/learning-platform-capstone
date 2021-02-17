import { AuthContext } from "./AuthProvider.js";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

export default function UserInfoGuard({ children }) {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser?.data) {
    return <Redirect to="/register/student-or-teacher"></Redirect>;
  } else {
    return <>{children}</>;
  }
}
