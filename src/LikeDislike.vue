<template>
    <div>
        <i @click="handleLikeDislike('like')" className="fas fa-thumbs-up like-button like-dislike"></i>
        <i @dislike="handleLikeDislike('dislike')" className="fas fa-thumbs-down dislike-button like-dislike"></i>
    </div>
</template>

<script>
export default {
    name: 'LikeDislike',
    methods: {
        handleLikeDislike: function(likeDislike) {
            console.log(likeDislike)
        }
    }
}
</script>