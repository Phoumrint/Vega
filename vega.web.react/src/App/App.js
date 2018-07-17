import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Navigation from './Navigation';
import ListVehicles from '../Vehicle/ListVehicles';
import EditVehicle from '../Vehicle/EditVehicle';

const App = () => {
    return (
      <div className='container'>
        <Navigation />
        <div>
            <Switch>
              <Route exact path="/" component={ListVehicles} />
              <Route exact path="/vehicles" component={ListVehicles} />
              <Route path="/vehicles/new" component={EditVehicle} />
              <Route path="/vehicles/:id" component={EditVehicle} />
            </Switch>
        </div>
      </div>
    );
}

export default App;
