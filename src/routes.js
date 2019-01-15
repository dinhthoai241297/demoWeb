import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/user/Login';
import Register from './components/user/Register';
import UpdateInfo from './components/user/UpdateInfo';
import Test from './components/common/Test';
import ActiveUser from './components/user/ActiveUser';

export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/update" component={UpdateInfo} />
        <Route exact path="/active" component={ActiveUser} />
        <Route exact path="/test" component={Test} />
    </Switch>
);
