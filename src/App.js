import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./components/AuthProvider";
import Example from "./components/Example";
import ReactExample from "./components/ReactExample";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PracticeModule from "./components/PracticeModule";
import LearnBinaryToDecimal from "./components/LearnBinaryToDecimal";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import QuizExample from "./components/QuizExample";
import StudentOrTeacher from "./components/StudentOrTeacher";
import StudentInfo from "./components/StudentInfo";
import TeacherInfo from "./components/TeacherInfo";
import ProfilePage from "./components/ProfilePage";
import UserInfoGuard from "./components/UserInfoGuard";

const theme = createMuiTheme({
  palette: {
    typography: {
      fontFamily: ["Roboto", '"Seqoe UI"', "Arial", "sans-serif"].join(","),
    },
    primary: {
      main: "#ff7300",
      light: "#ffa441",
      dark: "#c44300",
      contrastText: "#000000",
    },
    secondary: {
      main: "#4f2c1d",
      light: "#7d5544",
      dark: "#290200",
      contrastText: "#ffffff",
    },
    background: {
      main: "#000000",
      light: "#ffffff",
      dark: "#000000",
    },
    type: "light",
  },
});

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Header />
          <Switch>
            <Route path="/register/student-or-teacher" component={StudentOrTeacher} />
            <Route path="/register/student" component={StudentInfo} />
            <Route path="/register/teacher" component={TeacherInfo} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/example" component={Example} />
            <Route path="/material" component={Dashboard} />
            <Route path="/quiz" component={QuizExample} />
            <Route path="/learning" component={LearnBinaryToDecimal} />
            <Route path="/practice" component={PracticeModule} />
            <UserInfoGuard>
              <Route path="/profile" component={ProfilePage} />
              <Route path="/" component={ReactExample} />
            </UserInfoGuard>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
