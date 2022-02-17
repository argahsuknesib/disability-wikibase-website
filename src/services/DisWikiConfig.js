import axios from 'axios';
import { Redirect, Route } from "react-router-dom";
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
axios.interceptors.request.use(
    async config => {
        debugger
        if (window.sessionStorage.getItem('userConfig') !== null) {
            const keys = JSON.parse(window.sessionStorage.getItem('userConfig')).accessToken
            if (keys) {
                config.headers = {
                    'Authorization': `Bearer ${keys}`,
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        }
        return config;
    },
    error => {

        Promise.error(error)
    });


axios.interceptors.response.use(
    null,
    error => {
        debugger
        if (error.response && (error.response.status === 403 || error.response.status === 401)) {
            return window.location.href = '/login'
        }
        Promise.error(error)
    });