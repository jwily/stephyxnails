import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import StartForm from './0_StartForm';
import TierForm from './1_TierForm';
import ShapeForm from './2_ShapeForm';
import PhotoForm from './3_PhotoForm';
import DescriptionForm from './4_DescriptionForm'
import ExtraForm from './5_ExtraForm'
import Submissions from './6_SubmissionForm';

function SetRoutes() {

    return (
      <Router>
        <Switch>
        <Route path="/order-set/start" component={StartForm} />
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
