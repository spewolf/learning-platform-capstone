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

function App(props) {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header/>
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
