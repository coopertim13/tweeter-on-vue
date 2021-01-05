import axios from 'axios'
const baseURL = "/api/"

const register = (username, password, firstName, lastName, email, age, profilePicture) => {
    return axios.post(baseURL + 'register', {username, password, firstName, lastName, email, age, profilePicture})
        .then(response => response.data)
}

export default {register}