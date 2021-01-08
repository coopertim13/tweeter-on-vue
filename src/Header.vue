<template>
    <div>
        <header>
            <div className = "header-title">
                <h1 className = "title pink-title">Tweeter</h1>
            </div>
            <div className = "header-nav">
                <nav>
                    <ul>
                        <li><a href = "/home"><i className="fas fa-home"></i>Home</a></li>
                        <li><a href = "/hashtags"><i className="fas fa-hashtag"></i>Hashtags</a></li>
                        <li><a href = "/users"><i className="fas fa-user"></i>Users</a></li>
                        <li v-if="this.$store.getters.user"><a :href = "'/users/'+this.$store.getters.user.username"><img className="userIcon" alt="profilePicture" :src = "getImg(this.$store.getters.user.profile_picture)" width="50"/></a></li>
                        <li><a href = "/" @click="logout"><i className="fas fa-sign-out-alt"></i></a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <div className = "titleHeader">{{title}}</div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        logout: function() {
            this.$store.commit('change', {
                name: "loggedIn",
                value: false
            })
            this.$store.commit('change', {
                name: "user",
                value: null
            })
            localStorage.clear()
            this.$router.push('/')
        }
    },
    props: {
        title: String
    }
}
</script>