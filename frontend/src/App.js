import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';
import LandingPage from './components/LandingPage';
import OrderDetails from './components/OrderDetails';
import GalleryPage from './components/GalleryPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/ordersss" component={OrderDetails} />
      </Switch>
      <GalleryPage />
    </Router>
  );
}

export default App;
