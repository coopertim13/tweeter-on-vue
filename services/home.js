import axios from 'axios'

const home_unauthenticated = () => {
    return axios.get('/api/posts')
}

const home_authenticated = (user) => {
    if(!user) {
        return new Promise(() => null)
    }
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.get('/api/home_authenticated', config)
}

export default {
    home_authenticated,
    home_unauthenticated
}