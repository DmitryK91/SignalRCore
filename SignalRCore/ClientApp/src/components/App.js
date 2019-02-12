import React, { Component } from "react";
import Layout from "./Layout";
import Routing from '../Routes/routes';

import { Router } from 'react-router-dom';
import { history } from '../utils';
import "./App.css";

export default class App extends Component {

    render() {
        return (
            <Router history={history}>
                <Layout>
                    <Routing/>
                </Layout>
            </Router >
        );
    }
}