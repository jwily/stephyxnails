import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import OrderPage from './components/OrderDetails';
import AboutPage from './components/AboutPage';
import FaqPage from './components/FaqPage';
import LandingPage from './components/LandingPage';
import OrderDetails from './components/OrderDetails';
import GalleryPage from './components/GalleryPage';
import ReviewOrderPage from './components/ReviewOrderPage';
import StartForm from './components/OrderSetForm/0_StartForm';
import TierForm from './components/OrderSetForm/1_TierForm';
import ShapeForm from './components/OrderSetForm/2_ShapeForm';
import PhotoForm from './components/OrderSetForm/3_PhotoForm';
import DescriptionForm from './components/OrderSetForm/4_DescriptionForm'
import ExtraForm from './components/OrderSetForm/5_ExtraForm'
import Submissions from './components/OrderSetForm/6_SubmissionForm';

function App() {

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage}/>
            <Route exact path="/order" component={OrderPage}/>
            <Route path="/order-set/start" component={StartForm} />
          <Route path="/order-set/tier" component={TierForm} />
          <Route path="/order-set/shape" component={ShapeForm} />
          <Route path="/order-set/photo" component={PhotoForm} />
          <Route path="/order-set/description" component={DescriptionForm} />
          <Route path="/order-set/extra" component={ExtraForm} />
          <Route path="/order-set/all" component={Submissions} />

           
            {/* <Route exact path="/ordersss" component={OrderDetails}/> */}
            <Route exact path='/review-order' component={ReviewOrderPage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route exact path='/about' component={AboutPage}/>
        <Route exact path='/faq' component={FaqPage}/>
      </Switch>
      <Route exact path={['/']} component={GalleryPage} />
    </Router>
  );
}

export default App;
