<template>
    <div v-if="userProfile && userPosts">
        <Header :title="'@'+userProfile.username"/>
        <div className="row">
            <div className="column left-profile">
                <div className = "inner-side-col">
                    <div className = "inner-side-col-wrap">
                        <MiniUserProfile :user="userProfile"/>
                        <center><Follow/></center>
                    </div>
                </div>
            </div>
            <div className="column middle-content">
                <Posts :posts="userPosts" :refresh="this.refreshUser()"></Posts>
            </div>
        </div>
    </div>
    <div v-else className = "loader-container">
        <h1 className = "loading-text">Loading...</h1>
    </div>
</template>

<script>
import Header from './Header.vue'
import MiniUserProfile from './MiniUserProfile.vue'
import Follow from './Follow.vue'
import Posts from './Posts.vue'
import profileService from '../services/profile.js'

export default {
    name: 'User',
    data: function() {
        return {
            userProfile: null,
            userPosts: null
        }
    },
    components: {
        Header, MiniUserProfile, Follow, Posts
    },
    methods: {
        refreshUser: async function() {
            await profileService.profile_authenticated(this.$store.getters.user, this.$route.params.name)
                .then(result => {
                    this.userProfile = result.data.userProfile
                    this.userPosts = result.data.userPosts
                })
        }
    },
    created: function() {
        this.refreshUser()
    }
}
</script>