import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/store"
import Home from "../Home.vue"
import Login from "../Login.vue"
import Register from "../Register.vue"
import Users from "../Users.vue"
import User from "../User.vue"
import Hashtags from "../Hashtags.vue"
import Hashtag from "../Hashtag.vue"

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
        { path: '/register', component: Register},
        { path: '/users', component: Users},
        { path: '/users/:name', component: User},
        { path: '/hashtags', component: Hashtags},
        { path: '/hashtags/:tag', component: Hashtag}
    ]
})

export default router
