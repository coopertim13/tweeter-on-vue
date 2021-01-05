import axios from 'axios';

const getAll = () => {
    return axios.get('/api/posts')
}

const get_likes = (postID) => {
    const params = {
        post_id: { toJSON: () => postID}
    }
    return axios.get('/api/likes', { params })
}

const get_dislikes = (postID) => {
    const params = {
        post_id: { toJSON: () => postID}
    }
    return axios.get('/api/dislikes', { params })
}

const deletePost = (user, post) => {
    if(!user) {
        return new Promise(() => null)
    }
    const config = {
        headers: {'Authorization': "Bearer " + user.token},
        params: {
            user: { toJSON: () => post.author},
            post: { toJSON: () => post}
        }
    }
    return axios.delete('/api/post', config)
}

const post_comment = (user, post, comment) => {
    if(!user) {
        return new Promise(() => null)
    }
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.post('/api/post_comment', {post, comment}, config)
}

const changePostLikeDislike = (user, post, setTo, buttonPressed) => {
    if(!user) {
        return new Promise(() => null)
    }
    const config = {headers: {Authorization: "Bearer " + user.token}}
    return axios.put('/api/like_dislike', {post, setTo, buttonPressed}, config)
}

export default {
    getAll,
    get_likes,
    get_dislikes,
    deletePost,
    post_comment,
    changePostLikeDislike
}