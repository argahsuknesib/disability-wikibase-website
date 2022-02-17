/*
PRIVATE ROUTE CONFIG
CHECKS THE AUTH OBJECT IN LOCAL STORAGE AND APPROVE ROUTES
ONLY AUTHENTICATED USERS ARE APPROVED
*/
import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import AuthService from '../services/AuthService'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const location = useLocation();

    return (
        <Route {...rest}>
            {(AuthService.authCheck() === true) ?
                <Component {...rest} />
                :
                <Redirect to={{ pathname: "/login", state: { from: location } }} />
            }
        </Route>
    );
};

export default PrivateRoute;