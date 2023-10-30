import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TierForm from './TierForm';
import ShapeForm from './ShapeForm';
import PhotoForm from './PhotoForm';
import DescriptionForm from './DescriptionForm'
import ExtraForm from './ExtraForm'
import Submissions from './SubmissionForm';

function SetRoutes() {

    return (
      <Router>
        <Switch>
          <Route path="/order-set/tier" component={TierForm} />
          <Route path="/order-set/shape" component={ShapeForm} />
          <Route path="/order-set/photo" component={PhotoForm} />
          <Route path="/order-set/description" component={DescriptionForm} />
          <Route path="/order-set/extra" component={ExtraForm} />
          <Route path="/order-set/all" component={Submissions} />
        </Switch>
      </Router>
    );
  }
  
export default SetRoutes;
