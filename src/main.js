import { createApp } from "vue"
import App from "./App.vue"
import store from "./store/store"
import router from "./router/router"

const mixins = {
    methods: {
        getImg(pic) {
            return require('./images/'+pic+'.png')
        }
    }
}
const app = createApp(App)
app.use(router)
app.use(store)

if(localStorage.getItem("token") && localStorage.getItem("username") && localStorage.getItem("profile_picture")) {
    const user = {
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        profile_picture: localStorage.getItem("profile_picture")
    }
    store.commit('change', {
        name: "user",
        value: user
    })
    store.commit('change', {
        name: "loggedIn",
        value: true
    })
}
else {
    localStorage.clear()
}

app.mixin(mixins)
app.mount('#app')