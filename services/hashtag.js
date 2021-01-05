import axios from 'axios'

const get_all = () => {
    return axios.get('/api/hashtags')
}

const get_hashtag = (hashTag) => {
    const params = {
        hashtag: { toJSON: () => hashTag}
    }
    return axios.get('/api/get_hashtag', { params })
}

export default {
    get_all,
    get_hashtag
}