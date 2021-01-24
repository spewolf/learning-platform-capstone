import React from 'react';
import { Route } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import Example from './components/Example';
import ReactExample from './components/ReactExample';
/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <Route path="/" component={ReactExample} />
    <Route path="/example" component={Example} />
  </Route>
);