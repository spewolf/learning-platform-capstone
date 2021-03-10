import React, { useEffect, useState } from "react";
import firebase from "firebase";
import CircularProgress from "@material-ui/core/CircularProgress";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const app = firebase.apps[0];
  const db = firebase.firestore(app);

  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    async function updateCurrentUser(user) {
      const user_info = await db.collection("users").doc(user.uid).get();
      user.data = user_info.data();
      setCurrentUser(user);
      setPending(false);
    }
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        updateCurrentUser(user);
      } else {
        setCurrentUser(user);
        setPending(false);
      }
    });
  }, [db, app]);

  if (pending) {
    return <CircularProgress size="7em" style={{position: "fixed", top: `calc(50% - 5em)`, left: `calc(50% - 5em)`}}/>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
