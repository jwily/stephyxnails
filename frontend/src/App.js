import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderDetails';
import AboutPage from './components/AboutPage';
import FaqPage from './components/FaqPage';
import LandingPage from './components/LandingPage';
import GalleryPage from './components/GalleryPage';
import ReviewOrderPage from './components/ReviewOrderPage';
import StartForm from './components/OrderSetForm/0_StartForm';
import TierForm from './components/OrderSetForm/1_TierForm';
import ShapeForm from './components/OrderSetForm/2_ShapeForm';
import PhotoForm from './components/OrderSetForm/3_PhotoForm';
import DescriptionForm from './components/OrderSetForm/4_DescriptionForm';
import ExtraForm from './components/OrderSetForm/5_ExtraForm';
import Submissions from './components/OrderSetForm/6_SubmissionForm';
import EditSetForm from './components/OrderSetForm/EditSetForm';
import { useOrderContext } from './context/OrderContext';


// Custom route guard function to check if order details are completed
const isOrderDetailsCompleted = (orderDetails) => {
  return orderDetails.name && orderDetails.email && orderDetails.instagram;
};




function App() {


const { state } = useOrderContext(); // Replace with your actual context hook
const orderDetails = {
  name: state.name,       // Replace with the actual property from your context
  email: state.email,     // Replace with the actual property from your context
  instagram: state.instagram, // Replace with the actual property from your context
};


  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route path="/order-set/start" component={StartForm} />

        {isOrderDetailsCompleted(orderDetails) ? (
          <>
            <Route path="/order-set/tier" component={TierForm} />
            <Route path="/order-set/shape" component={ShapeForm} />
            <Route path="/order-set/photo" component={PhotoForm} />
            <Route path="/order-set/description" component={DescriptionForm} />
            <Route path="/order-set/extra" component={ExtraForm} />
            <Route path="/order-set/currentset" component={Submissions} />
            <Route exact path="/review-order" component={ReviewOrderPage} />
            <Route path="/order-set/edit/:index" component={EditSetForm} />
          </>
        ) : (
          // Redirect to the start route if order details are not completed
          <Redirect to="/order-set/start" />
        )}
        <Route exact path="/gallery" component={GalleryPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/faq" component={FaqPage} />
      </Switch>
    </Router>
  );
}

export default App;
