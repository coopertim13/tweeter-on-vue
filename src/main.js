import { createApp } from "vue"
import App from "./App.vue"
import store from "./store/store"
import router from "./router/router"
import postService from '../services/posts.js'
import userService from '../services/user.js'

const mixins = {
    methods: {
        getImg(pic) {
            return require('./images/'+pic+'.png')
        },
        managePopup: async function(type, title, ID) {
            var toHTML = "<h1 class = 'titlePopup'>" + title.charAt(0).toUpperCase() + title.substring(1) + "</h1>"
            if(type === "post") {
                if(title === "likes") {
                    await postService.get_likes(ID)
                        .then(result => {
                            for(var i = 0; i < result.data.likes.length; i++) {
                                toHTML = toHTML + ("<p class = 'popupItem'><b>"+result.data.likes[i].like_username+"</b></p>")
                            }
                            document.getElementById("popupInner").innerHTML = toHTML
                            document.getElementById("popup").style.display = "block"
                        })
                        .catch((error) => {})
                }
                else if(title === "dislikes") {
                    await postService.get_dislikes(ID)
                        .then(result => {
                            for(var i = 0; i < result.data.dislikes.length; i++) {
                                toHTML = toHTML + ("<p class = 'popupItem'><b>"+result.data.dislikes[i].dislike_username+"</b></p>")
                            }
                            document.getElementById("popupInner").innerHTML = toHTML
                            document.getElementById("popup").style.display = "block"
                        })
                        .catch((error) => {})
                }
            }
            else if(type === "user") {
                if(title === "following") {
                    await userService.get_following(ID)
                        .then(result => {
                            for(var i = 0; i < result.data.following.length; i++) {
                                toHTML = toHTML + ("<p class = 'popupItem'><b>"+result.data.following[i].following_username+"</b></p>")
                            }
                            document.getElementById("popupInner").innerHTML = toHTML
                            document.getElementById("popup").style.display = "block"
                        })
                        .catch((error) => {})
                }
                else if(title === "followers") {
                    await userService.get_followers(ID)
                        .then(result => {
                            for(var i = 0; i < result.data.followers.length; i++) {
                                toHTML = toHTML + ("<p class = 'popupItem'><b>"+result.data.followers[i].follower_username+"</b></p>")
                            }
                            document.getElementById("popupInner").innerHTML = toHTML
                            document.getElementById("popup").style.display = "block"
                        })
                        .catch((error) => {})
                }
            }
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