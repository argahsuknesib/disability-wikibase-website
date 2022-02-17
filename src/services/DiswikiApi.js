import axios from 'axios';
// import './DisWikiConfig.js'

// const API_HOST = process.env.REACT_APP_LOCAL_API_URL;
const API_HOST = process.env.REACT_APP_DISWIKI_API_URL;

class DiswikiApi {

    test(keyword) {
        let params = {
            'keyword': keyword
        };
        return axios.get(`${API_HOST}wikibase/search`, {
            params: params
        })

    }
    fileUpload(formData) {
        const config = {

            headers: {
                // 'Content-Type': 'multipart/form-data',
                // 'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        // return axios.post(`http://localhost:5000/api/file/upload`, formData,
        return axios.post(`${API_HOST}file/upload`, formData,
            config
        )

    }
    webContentUpload(formData) {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.post(`${API_HOST}web-content/upload`, formData,
            config
        )
    }
    getClassificationResult(document_name, document_id) {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST}doc-classifiy/download`,
            {
                params: { 'document_name': document_name, 'document_id': document_id }, headers
            })
    }

    getDocumentList() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}file/get-all-document`, config)
    }
    isDocumentNameExist(value) {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }

        return axios.get(`${API_HOST}file/is-name-exit`,
            {
                params: { 'file_name': value, }, headers
            })
    }

    getDocumentListPending() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}file/get-pending-document`, config)
    }

    donwloadDocument(fileName) {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}file/download-document`, { params: { 'file_name': fileName } })
    }
    getGlossaryListFlat() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}glossary/get-all-flat`, { config })
    }
    updateCLassificationEdit(payload) {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.post(`${API_HOST}doc-classifiy/update`, payload, config)
    }

    //WIKI EDIT API 
    uploadWikiEditRequest(document) {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        const payload = {
            'document': document
        }
        return axios.post(`${API_HOST}request/upload-wikiedit`, payload, config)
    }
    getAllPendingWikiEditRequest() {
        const config = {
            headers: {
                'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
            }
        }
        return axios.get(`${API_HOST}request/get-pending-request`, config)
    }
    getClassificationViewResult(document) {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST}doc-classifiy/view-result`,
            {
                params: { 'document_name': document.document_name, 'id': document.document_id, }, headers
            })
    }
    updateUploadRequest(payload) {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST}request/request-verify`,
            {
                params: payload, headers
            })
    }


    // TRAINING DATA API
    getTrainginData() {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST}training/`, { headers })
    }

    // web content upload
    getWebContents(url) {
        const headers = {
            'Authorization': `Bearer ${JSON.parse(window.sessionStorage.getItem('userConfig')).auth_token}`
        }
        return axios.get(`${API_HOST}web-content/`,
            {
                params: { 'link': url }, headers
            })
    }
}

export default new DiswikiApi();