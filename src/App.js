import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderWithDrawer from "./components/HeaderWithDrawer";
import { AuthProvider } from "./components/AuthProvider";
import Example from "./components/Example";
import ReactExample from "./components/ReactExample";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PracticeModule from "./components/PracticeModule";
import LearningModule from "./components/LearningModule";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import StudentOrTeacher from "./components/StudentOrTeacher";
import StudentInfo from "./components/StudentInfo";
import TeacherInfo from "./components/TeacherInfo";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";

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
    <div style={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <HeaderWithDrawer />
            <main style={{ flexGrow: 1, paddingTop: theme.spacing(8) }}>
              <Switch>
                <Route path="/register/student-or-teacher" component={StudentOrTeacher} />
                <Route path="/register/student" component={StudentInfo} />
                <Route path="/register/teacher" component={TeacherInfo} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/example" component={Example} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/learning" component={LearningModule} />
                <Route path="/practice" component={PracticeModule} />
                <PrivateRoute path="/profile" component={ProfilePage} />
                <PrivateRoute path="/" component={ReactExample} />
              </Switch>
            </main>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
