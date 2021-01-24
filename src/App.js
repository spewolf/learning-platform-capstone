import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Example from './components/Example';
import ReactExample from './components/ReactExample';

function App(props) {
  return (
    <div>
      <Router>
        <header>
          Binary Learning System - I am a header
          <Link to="/">React Example</Link>
          <Link to="/example">Example Component</Link>
        </header>
        <Switch>
          <Route path="/example">
            <Example />
          </Route>
          <Route path="/">
            <ReactExample />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
