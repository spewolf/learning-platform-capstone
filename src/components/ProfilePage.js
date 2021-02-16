import { AuthContext } from "./AuthProvider.js";
import React, { useContext } from "react";

export default function ProfilePage(props) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>{currentUser.data.name}</h1>
      <h2>{currentUser.data.type}</h2>
      <p>Course Code: {currentUser.data.course}</p>
      <p>Email: {currentUser.email}</p>
    </div>
  );
}
