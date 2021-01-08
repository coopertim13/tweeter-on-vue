import axios from 'axios'

const profile_unauthenticated = (displayUsername) => {
    const params = {
        profileName: { toJSON: () => displayUsername}
    }
    return axios.get('/api/profile_guest', { params })
}

const profile_authenticated = (user, displayUsername) => {
    if(!user) {
        const params = {
            profileName: { toJSON: () => displayUsername}
        }
        return axios.get('/api/profile_guest', { params })
    }

    const config = {
        headers: {'Authorization': "Bearer " + user.token},
        params: {
            user: { toJSON: () => user.username},
            profileName: { toJSON: () => displayUsername}
        }
      }

    return axios.get('/api/profile_user', config)
}

export default {
    profile_authenticated,
    profile_unauthenticated
}