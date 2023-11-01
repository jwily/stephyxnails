import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';
import LandingPage from './components/LandingPage';
import OrderDetails from './components/OrderDetails';
import GalleryPage from './components/GalleryPage';
import ReviewOrderPage from './components/ReviewOrderPage';
import OrderSetRoute from './components/OrderSetForm/SetOrderRoute'
import { OrderProvider } from "./context/OrderContext";

function App() {

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <OrderProvider>
          <Route exact path="/order" component={OrderPage} />
          <OrderSetRoute />
          <Route exact path='/review-order' component={ReviewOrderPage} />
        </OrderProvider>
      </Switch>
      <Route exact path={['/']} component={GalleryPage} />
    </Router>
  );
}

export default App;
