import React, { useContext } from 'react';
import { AuthContext } from "./AuthProvider.js";
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import { Redirect } from "react-router-dom";

export default function Dashboard(props) {
  props.setLocation("Dashboard")

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return(<Redirect to="/login"></Redirect>)
  }

  let isStudent = currentUser.data?.type === "student";

  return (
    <div>
      <div style={isStudent ? {} : {display: "none"}}>
        <StudentDashboard />
      </div>
      <div style={isStudent ? {display: "none"} : {}}>
        <InstructorDashboard />
      </div>
    </div>
  );
}