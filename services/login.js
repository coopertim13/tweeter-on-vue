import axios from 'axios'
const baseURL = "/api/"

const login = (username, password) => {
    return axios.post(baseURL + 'login', {username, password})
        .then(response => response.data)
}

export default {
    login
}