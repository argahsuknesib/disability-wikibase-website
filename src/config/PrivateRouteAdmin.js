/*
PRIVATE ROUTE ADMIN CONFIG
CHECKS THE AUTH OBJECT IN LOCAL STORAGE AND APPROVE ROUTES
ONLY ADMIN AUTH ARE ALLOWED
*/
import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import AuthService from '../services/AuthService'

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
    const location = useLocation();

    return (
        <Route {...rest}>
            {(AuthService.validateAuthAdmin() === true) ?
                <Component {...rest} />
                :
                <Redirect to={{ pathname: "/login", state: { from: location } }} />
            }
        </Route>
    );
};

export default PrivateRouteAdmin;