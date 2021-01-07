<template>
    <div>
        <form v-if="this.$store.getters.userDetails" className = "make-post-form" v-on:submit="postTweet" id = "make-post-form">
            <textarea id = "post-form" name="post-form" maxLength="250" @input="handleTweet" v-bind:placeholder="'What\'s on your mind, ' + this.$store.getters.userDetails.first_name + '?'" required form="make-post-form"></textarea>
            <input className = "tweet-submit" type="submit" value="Post Tweet"/>
        </form>
        <div className = "characters-left"><strong>{{charactersLeft}}</strong> characters left</div>
    </div>
</template>

<script>
export default {
    name: 'PostForm',
    data: function() {
        return {
            tweet: '',
            charactersLeft: 250
        }
    },
    methods: {
        postTweet: function(event) {
            console.log(event)
        },
        handleTweet: function(event) {
            this.tweet = event.target.value
            this.charactersLeft = 250 - event.target.value.length
        }
    }
}
</script>