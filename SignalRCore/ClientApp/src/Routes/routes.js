import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Components/Home';
import LoginPage from '../User/Components/LoginPage';
import { PrivateRoute } from '../Components/PrivateRoute';

export default class Routing extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute exact path="/" component={Home} />
                </Switch>
            </main>
        );
    }
};
