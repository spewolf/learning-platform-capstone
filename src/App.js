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
import AssessmentModule from "./components/AssessmentModule";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import StudentOrTeacher from "./components/StudentOrTeacher";
import StudentInfo from "./components/StudentInfo";
import TeacherInfo from "./components/TeacherInfo";
import ProfilePage from "./components/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline"

const theme = createMuiTheme({
  palette: {
    spacing: 8,
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
      default: "#fafafa",
      light: "#ffffff",
      dark: "#000000",
      paper: "#ffffff"
    },
    text: {
      primary: "#000",
      secondary: "#rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    divider: "rgb(0,0,0,0.2)",
  },
});

function App(props) {
  const [location, setLocation] = React.useState("");

  return (
    <div style={{ display: "flex" }}>
      <ThemeProvider theme={theme}> <CssBaseline />
        <AuthProvider>
          <Router>
            <HeaderWithDrawer location={location}/>
            <main style={{ flexGrow: 1, paddingTop: theme.spacing(8), paddingLeft: theme.spacing(3) }}>
              <Switch>
                <Route path="/register/student-or-teacher" render={() => <StudentOrTeacher setLocation={setLocation}/>} />
                <Route path="/register/student" render={() => <StudentInfo setLocation={setLocation}/>} />
                <Route path="/register/teacher" render={() => <TeacherInfo setLocation={setLocation}/>} />
                <Route path="/register" render={() => <Register setLocation={setLocation}/>} />
                <Route path="/login" render={() => <Login setLocation={setLocation}/>} />
                <Route path="/example" render={() => <Example setLocation={setLocation}/>}/>
                <Route path="/dashboard" render={() => <Dashboard setLocation={setLocation}/>} />
                <Route path="/learning" render={() => <LearningModule setLocation={setLocation}/>} />
                <Route path="/practice" render={() => <PracticeModule setLocation={setLocation}/>} />
                <Route path="/assessment" render={() => <AssessmentModule setLocation={setLocation}/>} />
                <PrivateRoute path="/profile" render={() => <ProfilePage setLocation={setLocation}/>} />
                <PrivateRoute path="/" render={() => <ReactExample setLocation={setLocation}/>} />
              </Switch>
            </main>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
