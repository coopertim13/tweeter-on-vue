<template>
    <div v-if="this.$store.getters.userDetails" className="imageWrapWrap">
        <div className = "imageWrap">
            <img alt = "profilePicture" :src = "this.getImg(this.$store.getters.userDetails.profile_picture)" width = "200"/>
        </div>
        <h2 className = "userFullNameHome">{{this.$store.getters.userDetails.first_name}} {{this.$store.getters.userDetails.last_name}}</h2>
        <h3 className = "userNameHome">{{this.$store.getters.userDetails.username}}</h3><br/>
        <span className = "userStatHome"><strong>{{this.$store.getters.userDetails.posts.length}}</strong> Posts</span>
        <span className = "userStatHome pointerObject"><strong>{{this.$store.getters.userDetails.followers.length}}</strong> Followers</span>
        <span className = "userStatHome pointerObject"><strong>{{this.$store.getters.userDetails.following.length}}</strong> Following</span><br/>
    </div>
</template>

<script>
export default {
    name: 'MiniUserProfile'
}
</script>