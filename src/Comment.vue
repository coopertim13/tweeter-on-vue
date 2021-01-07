<template>
    <form className = "make-comment-form" v-on:submit="commentHandler" :id="'make-comment-form-'+tweet">
        <input type = "text" id = "comment-form" name="comment-form" maxLength="50" @input="setComment" placeholder="Write a comment..." required/>
        <input className = "comment-submit" type="submit" value="Post Comment"/>
    </form>
</template>

<script>
import postService from '../services/posts.js'

export default {
    name: 'Comment',
    data: function() {
        return {
            comment: ''
        }
    },
    methods: {
        setComment: function(event) {
            this.comment = event.target.value
        },
        commentHandler: async function(event) {
            event.preventDefault()
            await postService.post_comment(this.$store.getters.user, this.tweet, this.comment)
                .then(result => {
                    var commentFormID = "make-comment-form-" + this.tweet
                    document.getElementById(commentFormID).reset()
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