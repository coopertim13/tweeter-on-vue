<template>
    <i @click="deletePost" className="fas fa-trash deletePost"></i>
</template>

<script>
import postService from '../services/posts.js'

export default {
    name: 'Posts',
    methods: {
        async deletePost() {
            await postService.deletePost(this.$store.getters.user, this.tweet)
                .then(result => {
                    this.refresh()
                })
                .catch(error => {

                })
        }
    },
    props: {
        tweet: Object,
        refresh: Function
    }
}
</script>