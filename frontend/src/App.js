import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderPage';
import SizingPage from './components/SizingPage';
import GalleryPage from './components/GalleryPage';
import AboutPage from './components/AboutPage';
import FaqPage from './components/FaqPage';
import LandingPage from './components/LandingPage';
// import OrderDetails from './components/OrderDetails';
import ReviewOrderPage from './components/ReviewOrderPage';
import OrderSetRoutes from './components/OrderSetForm/SetOrderRoute'
import { OrderProvider } from "./context/OrderContext";

function App() {

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <OrderProvider>
            <Route exact path="/order" component={OrderPage}/>
            <OrderSetRoutes />
            {/* <Route exact path="/ordersss" component={OrderDetails}/> */}
            <Route exact path='/review-order' component={ReviewOrderPage} />
        </OrderProvider>
        <Route exact path='/sizing' component={SizingPage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route exact path='/about' component={AboutPage}/>
        <Route exact path='/faq' component={FaqPage}/>
      </Switch>
    </Router>
  );
}

export default App;
