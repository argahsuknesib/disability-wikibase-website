import axios from 'axios';
import { API_HOST } from '../config';
export default {
    get: function (path) {
        return axios.get(`${API_HOST}${path}`);
        // let windows = response.data;
        // return windows;
    },
    put: function (path, params) {
        return axios.put(`${API_HOST}${path}`, params);
    },
    delete: function (path) {
        return axios.delete(`${API_HOST}${path}`);
    },
    putWithBody: function (path, body, params) {
        return axios.put(`${API_HOST}${path}`, body, params);
    },
    post: function (path, body) {
        return axios.post(`${API_HOST}${path}`, body);
    }
}