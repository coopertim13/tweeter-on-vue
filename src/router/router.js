import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/store"
import Home from "../Home.vue"
import Login from "../Login.vue"
import Register from "../Register.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            beforeEnter(to, from, next) {
                if(store.getters.loggedIn) {
                    next('/home')
                }
                else {
                    next('/login')
                }
            }
        },
        { path: '/login', component: Login},
        { path: '/home', component: Home},
        { path: '/register', component: Register}
    ]
})

export default router
