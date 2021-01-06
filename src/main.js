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
app.mixin(mixins)
app.mount('#app')