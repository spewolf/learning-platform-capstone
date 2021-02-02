import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from 'firebase';

import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './components/AuthProvider';

import Example from './components/Example';
import ReactExample from './components/ReactExample';
import Login from './components/Login';
import Register from './components/Register';

function App(props) {
  const app = firebase.apps[0];
  
  return (
    <AuthProvider>
      <Router>
        <header>
          Binary Learning System - I am a header
          <Link to="/">React Example</Link>
          <Link to="/example">Example Component</Link>
          <Link to="/Login">_Login</Link>
          <Link to="/Register">_Register</Link>
          <button onClick={() => app?.auth().signOut()}>_Sign out</button>
        </header>
        <Switch>
          <PrivateRoute path="/example" component={Example} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={ReactExample} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
