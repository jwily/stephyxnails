import logo from './logo.svg';
import './App.css';

import OrderPage from './components/OrderPage'

function App() {

  return (
  <>
    <Route path='/'>
      {/* <Header /> */}
    </Route>
    <Switch>
      <Route exact path='/order'>
        <OrderPage />
      </Route>
    <Route>
        <PageNotFound />
    </Route>
    </Switch>

  </>
  );
}

export default App;
