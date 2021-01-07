<template>
    <div>
        <i @click="handleLikeDislike('like')" :data-like="this.like" className="fas fa-thumbs-up like-button like-dislike"></i>
        <i @click="handleLikeDislike('dislike')" :data-dislike="this.dislike" className="fas fa-thumbs-down dislike-button like-dislike"></i>
    </div>
</template>

<script>
import likeDislikeService from '../services/posts.js'

export default {
    name: 'LikeDislike',
    methods: {
        handleLikeDislike: async function(likeDislike) {
            if(this.like && likeDislike === "like" || this.dislike && likeDislike === "dislike") {
                await likeDislikeService.changePostLikeDislike(this.$store.getters.user, this.tweet, null, likeDislike)
                    .then(result => {
                        this.refresh()
                    })
                    .catch(error => {
                    })
            }
            else {
                await likeDislikeService.changePostLikeDislike(this.$store.getters.user, this.tweet, likeDislike, likeDislike)
                    .then(result => {
                        this.refresh()
                    })
                    .catch(error => {
                    })
            }
        }
    },
    props: {
        tweet: Object,
        refresh: Function,
        like: Boolean,
        dislike: Boolean
    }
}
</script>