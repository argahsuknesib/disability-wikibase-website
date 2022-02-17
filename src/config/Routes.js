/*
ROUTE CONFIG
MAIN APPLICATION ROUTE 
PUBLIC WEBSITE ROUTE
*/
import { createBrowserHistory } from "history";
import React from "react";
import {
    BrowserRouter as Router, Route,
    // HashRouter as Router,
    Switch
} from "react-router-dom";
import AdminView from '../admin-site/AdminView';
import MainView from '../pub-website/MainView';

var hist = createBrowserHistory();

const RootMain = (props) => (

    <main>
        <Router history={hist}>
            <Switch>
                <Route path='/home' component={MainView} />
                <Route exact path='/admin' component={AdminView} />
            </Switch>
        </Router>
    </main>
)

export default RootMain