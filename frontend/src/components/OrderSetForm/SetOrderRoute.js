import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from 'react-router-dom';

import TierForm from './TierForm';
import ShapeForm from './ShapeForm';
import PhotoForm from './PhotoForm';
import DescriptionForm from './DescriptionForm'
import ExtraForm from './ExtraForm'
import Submissions from './Submissions';

function Routes() {
    return (
      <Router>
        <Switch>
          <Route path="/set/tier" component={TierForm} />
          <Route path="/set/shape" component={ShapeForm} />
          <Route path="/set/photo" component={PhotoForm} />
          <Route path="/set/description" component={DescriptionForm} />
          <Route path="/set/extra" component={ExtraForm} />
          <Route path="/set/all" component={Submissions} />
        </Switch>
      </Router>
    );
  }
  
export default Routes;
