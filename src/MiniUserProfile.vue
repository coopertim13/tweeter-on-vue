<template>
    <div v-if="this.user" className="imageWrapWrap">
        <div className = "imageWrap">
            <img alt = "profilePicture" :src = "this.getImg(user.profile_picture)" width = "200"/>
        </div>
        <h2 className = "userFullNameHome">{{user.first_name}} {{user.last_name}}</h2>
        <h3 className = "userNameHome">{{user.username}}</h3><br/>
        <span className = "userStatHome"><strong>{{user.posts.length}}</strong> Posts</span>
        <span @click="managePopup('user', 'followers', user.username)" className = "userStatHome pointerObject"><strong>{{user.followers.length}}</strong> Followers</span>
        <span @click="managePopup('user', 'following', user.username)" className = "userStatHome pointerObject"><strong>{{user.following.length}}</strong> Following</span><br/>
    </div>
</template>

<script>
export default {
    name: 'MiniUserProfile',
    props: {
        user: Object
    }
}
</script>