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
            path: '/', name: 'base', 
            beforeEnter(to, from, next) {
                if(store.getters.loggedIn) {
                    next('/home')
                }
                else {
                    next('/login')
                }
            }
        },
        { path: '/login', name: 'login', component: Login},
        { path: '/home', name: 'home', component: Home},
        { path: '/register', name: 'register', component: Register},
        { path: '/users', name: 'users', component: Users},
        { path: '/users/:name', name: 'user', component: User},
        { path: '/hashtags', name: 'hashtags', component: Hashtags},
        { path: '/hashtags/:tag', name: 'hashtag', component: Hashtag}
    ]
})

/* --> can be used to disable guest login
router.beforeEach((to, from, next) => {
    if(to.name !== 'login' && to.name !== 'base' && to.name !== 'register' && !store.getters.loggedIn) {
        next({ name: 'base' })
    }
    else {
        next()
    }
})
*/

export default router
