import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';
import SizingPage from './components/SizingPage';
import GalleryPage from './components/GalleryPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/order" component={OrderPage}/>
        <Route exact path='/sizing' component={SizingPage} />
        <Route exact path='/gallery' component={GalleryPage} />
      </Switch>
    </Router>
  );
}

export default App;
