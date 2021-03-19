import React, { useContext } from "react";
import firebase from "firebase";

import { AuthContext } from "./AuthProvider.js";
import Quiz from "./Quiz";

export default function GradedQuiz(props) {
  const { currentUser } = useContext(AuthContext);

  const app = firebase.apps[0];
  const db = firebase.firestore(app);

  const handleSubmission = (s) => {
    s.studentID = currentUser.uid;
    s.studentName = currentUser.data.name;
    s.studentBGID = currentUser.data.bgsu_id;
    db.collection("assignments").doc(s.id).collection("submissions").add(s);
  };

  if (props.assignment.id === undefined) {
    return <h3 style={{ color: "red" }}>ERROR: Assignment missing .id property</h3>;
  }

  return <Quiz assignment={props.assignment} handleSubmission={handleSubmission} />;
}
