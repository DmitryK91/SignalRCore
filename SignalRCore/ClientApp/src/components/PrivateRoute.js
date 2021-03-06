﻿import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogged } from '../utils';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isLogged()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)