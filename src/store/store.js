import { createStore } from 'vuex';

const store = createStore({
    state: {
        username: '',
        password: ''
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
        username: state => state.username,
        password: state => state.password
    }
})

export default store