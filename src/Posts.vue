<template>
    <div className = "allPosts">
        <h1>All Posts</h1>
        {{this.$store.getters.allPosts}}
        <Delete/>
        <LikeDislike/>
        <Comment/>
    </div>
</template>

<script>
import Delete from './Delete.vue'
import LikeDislike from './LikeDislike.vue'
import Comment from './Comment.vue'

export default {
    name: 'Posts',
    components: {
        Delete, LikeDislike, Comment
    },
    beforeCreate: function() {
      this.$store.dispatch('getAllPosts');
    },
}
</script>