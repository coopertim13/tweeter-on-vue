<template>
    <form className = "make-comment-form" v-on:submit="commentHandler">
        <input type = "text" id = "comment-form" name="comment-form" maxLength="50" @input="setComment" placeholder="Write a comment..." required/>
        <input className = "comment-submit" type="submit" value="Post Comment"/>
    </form>
</template>

<script>
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
        }
    }
}
</script>