import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './components/AuthProvider';
import Example from './components/Example';
import ReactExample from './components/ReactExample';
import Login from './components/Login';
import Register from './components/Register';
import MaterialExamples from './components/MaterialExamples';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import QuizExample from './components/QuizExample';
import StudentOrTeacher from './components/StudentOrTeacher';
import StudentInfo from './components/StudentInfo';
import TeacherInfo from './components/TeacherInfo';
import ProfilePage from './components/ProfilePage';

const theme = createMuiTheme({
  palette: {
    typography: {
      fontFamily: [ 'Roboto', '"Seqoe UI"', 'Arial', 'sans-serif', ].join(','),
    },
    primary: {
      main: '#ff7300',
      light: '#ffa441',
      dark: '#c44300',
      contrastText: '#000000',
    },
    secondary: {
      main: '#4f2c1d',
      light: '#7d5544',
      dark: '#290200',
      contrastText: '#ffffff',
    },
    background: {
      main: '#000000',
      light: '#ffffff',
      dark: '#000000'
    },
    type: 'light',
  },
});

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Paper className={theme.background}>
        <AuthProvider>
          <Router>
            <Header />
            <Switch>
              <PrivateRoute path="/example" component={Example} />
              <Route path="/material" component={MaterialExamples} />
              <Route path="/quiz" component={QuizExample} />
              <Route path="/login" component={Login} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/register/student-or-teacher" component={StudentOrTeacher}/>
              <Route path="/register/student" component={StudentInfo}/>
              <Route path="/register/teacher" component={TeacherInfo}/>
              <Route path="/register" component={Register} />
              <Route path="/" component={ReactExample} />
            </Switch>
          </Router>
        </AuthProvider>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
