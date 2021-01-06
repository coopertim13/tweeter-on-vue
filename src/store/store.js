import { createStore } from 'vuex';

const store = createStore({
    state: {
        loggedIn: false
    },
    mutations: {
        change(state, theChange) {
            state[theChange.name] = theChange.value
        },
        arrayItemChange(state, theChange) {
            state[theChange.name][theChange.index] = theChange.value
        }
    },
    getters: {
        loggedIn: state => state.loggedIn
    }
})

export default store