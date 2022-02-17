import axios from 'axios';
const API_HOST_QA = process.env.REACT_APP_QA_API_URL;
// const API_HOST_DIS_WIKI = process.env.REACT_APP_LOCAL_API_URL;
const API_HOST_DIS_WIKI = process.env.REACT_APP_DISWIKI_API_URL;
class AuthService {

    login(username, password) {
        let body = { 'usernameOrEmail': username, 'password': password }
        return axios.post(`${API_HOST_QA}user/signin`, body);
    }

    login_dis_wiki(email, password) {
        let body = { 'email': email, 'password': password }
        return axios.post(`${API_HOST_DIS_WIKI}user/login`, body);
    }
    logout_dis_wiki() {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST_DIS_WIKI}user/logout`,
            { headers }
        )
    }
    register(username, email, password) {
        let body = { 'username': username, 'email': email, 'password': password }
        return axios.post(`${API_HOST_DIS_WIKI}user/register`, body);
    }
    authCheck() {
        let userConfig = JSON.parse(window.sessionStorage.getItem('userConfig'))
        return (userConfig) ? true : false
        // return true
    }

    validateAuthAdmin() {
        let userConfig = JSON.parse(window.sessionStorage.getItem('userConfig'))
        return (userConfig && userConfig.sp) ? true : false
    }

}
export default new AuthService();