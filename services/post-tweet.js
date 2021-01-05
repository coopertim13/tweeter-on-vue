import axios from 'axios'

const post_tweet = (user, tweet) => {
    if(!user) {
        return new Promise(() => null)
    }
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.post('/api/post_tweet', tweet, config)
}

export default {
    post_tweet
}