import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import firebase from 'firebase';

import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './components/AuthProvider';

import Example from './components/Example';
import ReactExample from './components/ReactExample';
import Login from './components/Login';
import Register from './components/Register';
import MaterialExamples from './components/MaterialExamples';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

function App(props) {
  const app = firebase.apps[0];
  
  return (
    <div>
      <AuthProvider>
        <Router>
          <header>
            <ButtonGroup 
              variant="contained" 
              color="primary" 
              aria-label="contained primary button group"
            >
              <Button href="/">React</Button>
              <Button href="/example">Example</Button>
              <Button href="/login">Login</Button>
              <Button href="/register">Register</Button>
              <Button href="/material">Material</Button>
              <Button onClick={() => app?.auth().signOut()}>Sign out</Button>
            </ButtonGroup>
          </header>
          <Switch>
            <PrivateRoute path="/example" component={Example} />
            <Route path="/login" component={Login} />
            <Route path="/material" component={MaterialExamples} /> 
            <Route path="/register" component={Register} />
            <Route path="/" component={ReactExample} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
