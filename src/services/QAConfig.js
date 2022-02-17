import axios from 'axios';

// axios.interceptors.request.use(
//     config => {
//         // Do something before request is sent
//         config.headers["Authorization"] = `Bearer ${JSON.parse(window.sessionStorage.getItem('user-config')).accessToken}`;
//         return config;
//     },
//     error => {
//         Promise.reject(error);
//     }
// );


//2ND METHOD************************
// const axios = require('axios');
// import axios from 'axios';
// const axiosApiInstance = axios.create();


//THIS IS WORKING #########################################################################

// Request interceptor for API calls
// axios.interceptors.request.use(
//     async config => {
//         const keys = JSON.parse(window.sessionStorage.getItem('user-config')).accessToken
//         if (keys) {
//             config.headers = {
//                 'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('user-config')).accessToken}`,
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }
//         return config;
//     },
//     error => {
//         Promise.reject(error)
//     });


// const refreshAccessToken = () => {
//     alert('Token expired')
// }
// Response interceptor for API calls
// axios.interceptors.response.use((response) => {
//     return response
// }, async function (error) {
//     const originalRequest = error.config;
//     if (error.response.status === 403 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         const access_token = await refreshAccessToken();
//         axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//         // return axiosApiInstance(originalRequest);
//         return axios(originalRequest);
//     }
//     return Promise.reject(error);
// });