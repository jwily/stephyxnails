import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TierForm from './TierForm';
import ShapeForm from './ShapeForm';
import PhotoForm from './PhotoForm';
import DescriptionForm from './DescriptionForm'
import ExtraForm from './ExtraForm'
import Submissions from './Submissions';



function Routes() {
    return (
      <Switch>
        <Route path="/tier" component={TierForm} />
        <Route path="/shape" component={ShapeForm} />
        <Route path="/photo" component={PhotoForm} />
        <Route path="/description" component={DescriptionForm} />
        <Route path="/extra" component={ExtraForm} />
        <Route path="/submissions" component={Submissions} />
      </Switch>
    );
  }
  
  export default Routes;
