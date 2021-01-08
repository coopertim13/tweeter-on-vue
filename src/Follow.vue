<template>
    <button v-if="this.$store.getters.user" @click="handleFollow" className = "followButton" :data-follow="followState">{{followState}}</button>
</template>

<script>
import userService from '../services/user.js'

export default {
    name: 'Follow',
    props: {
        userProfile: String,
        followText: String,
        refresh: Function
    },
    data: function() {
        return {
            followState: this.followText
        }
    },
    methods: {
        handleFollow: async function() {
            if(this.followText === 'Following') {
                await userService.unfollow_user(this.$store.getters.user, this.userProfile)
                    .then(result => {
                        this.followState = 'Follow'
                        this.refresh()
                    })
                    .catch(error => {

                    })
            }
            else {
                await userService.follow_user(this.$store.getters.user, this.userProfile)
                    .then(result => {
                        this.followState = 'Following'
                        this.refresh()
                    })
            }
        }
    }
}
</script>