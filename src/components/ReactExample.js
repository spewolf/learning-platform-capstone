import logo from "../logo.svg";
import "./ReactExample.css";
import firebase from "firebase";
import React, { useState } from "react";

export default function ReactExample(props) {
  // Firebase stuff in here is just an example, can be deleted
  const app = firebase.apps[0];
  const db = firebase.firestore(app);

  const [quote, setQuote] = useState(0);

  // To add a new student:
  /*db.collection("students").add ({
      course: "course_id",
      student_uid: "student_uid",
      name: "Test Student",
      bgsu_id: "0011111111",
      assignments: "{\"assignments\":[]}"
    }) */

  // To add a new instructor:
  /*db.collection("instructors").add ({
      course: "course_id",
      instructor_uid: "instructor_uid",
      name: "Test Instructor
    }) */

  // Pull info from database:
  db.collection("quotes")
    .doc("JfAQwxQZdhyCBnG2i6PA")
    .get()
    .then((query) => setQuote(query.data().body));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{quote}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
