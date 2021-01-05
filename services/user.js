import axios from 'axios'

const getAll = () => {
    return axios.get('/api/users')
}

const get_following = (username) => {
    const params = {
        username: { toJSON: () => username}
    }
    return axios.get('/api/following', { params })
}

const get_followers = (username) => {
    const params = {
        username: { toJSON: () => username}
    }
    return axios.get('/api/followers', { params })
}

const get_profile_picture = (user) => {
    if(!user) {
        return new Promise(() => null)
    }
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.get('/api/profile_picture', config)
}

const fetch_all_user_details = (user) => {
    if(!user) {
        return new Promise(() => null)
    }
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.get('/api/fetch', config)
}

const get_user = (userName) => {
    const params = {
        user: { toJSON: () => userName}
    }
    return axios.get('/api/user', { params })
}

const follow_state = (user, profileName) => {
    const params = {
        user: { toJSON: () => user},
        profileName: { toJSON: () => profileName}
    }
    return axios.get('/api/follow_state', { params })
}

const follow_user = (user, profileName) => {
    if(!user) {
        return new Promise(() => null)
    }
    const username = user.username
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.put('/api/follow_user', {username, profileName}, config)
}

const unfollow_user = (user, profileName) => {
    if(!user) {
        return new Promise(() => null)
    }
    const username = user.username
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.put('/api/unfollow_user', {username, profileName}, config)
}

export default {
    getAll,
    get_following,
    get_followers,
    get_profile_picture,
    fetch_all_user_details,
    get_user,
    follow_state,
    follow_user,
    unfollow_user
}