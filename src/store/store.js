import { createStore } from 'vuex';
import postService from '../../services/posts.js'
import homeService from '../../services/home.js'

const store = createStore({
    state: {
        loggedIn: false,
        allPosts: null,
        user: null,
        userDetails: null
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
        },
        async getUserDetails({ commit }) {
            const userDetails = await homeService.home_authenticated(store.getters.user)
            commit('change', {
                name: "userDetails",
                value: userDetails.data.userDetails
            })
        }
    },
    getters: {
        loggedIn: state => state.loggedIn,
        allPosts: state => state.allPosts,
        user: state => state.user,
        userDetails: state => state.userDetails
    }
})

export default store