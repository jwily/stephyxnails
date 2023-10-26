import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/order">
          <OrderPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
