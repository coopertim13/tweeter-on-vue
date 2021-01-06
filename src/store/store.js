import { createStore } from 'vuex';
import postService from '../../services/posts.js'

const store = createStore({
    state: {
        loggedIn: false,
        allPosts: null,
        user: null
    },
    mutations: {
        change(state, theChange) {
            state[theChange.name] = theChange.value
        },
        arrayItemChange(state, theChange) {
            state[theChange.name][theChange.index] = theChange.value
        }
    },
    actions: {
        async getAllPosts({ commit }) {
            const posts = await postService.getAll()
            commit('change', {
                name: "allPosts",
                value: posts.data
            })
        }
    },
    getters: {
        loggedIn: state => state.loggedIn,
        allPosts: state => state.allPosts,
        user: state => state.user
    }
})

export default store