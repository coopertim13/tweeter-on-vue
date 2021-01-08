<template>
    <div>
        <Header title="Home"/>
        <div className="row">
            <div v-if="this.$store.getters.user" className="column left-profile">
                <div className = "inner-side-col">
                    <div className = "inner-side-col-wrap">
                        <MiniUserProfile :user="this.$store.getters.userDetails"/>
                    </div>
                </div>
            </div>
            <div className="column middle-content">
                <PostForm/>
                <ul v-if="this.$store.getters.user" className="filterOptions">
                    <li>
                        <input @input="filterPosts" type="checkbox" className="switch" id="setFollowingCheck"/>
                        <label for="s1">Following</label>
                    </li>
                    <li>
                        <input @input="filterPosts" type="checkbox" className="switch" id="setLikeCheck"/>
                        <label for="s2">Liked</label>
                    </li>
                    <li>
                        <input @input="filterPosts" type="checkbox" className="switch" id="setDislikeCheck"/>
                        <label for="s2">Disliked</label>
                    </li>
                    <li>
                        <input @input="filterPosts" type="checkbox" className="switch" id="setCommentedCheck"/>
                        <label for="s2">Commented</label>
                    </li>
                    <li>
                        <input @input="filterPosts" type="checkbox" className="switch" id="setMentionedCheck"/>
                        <label for="s2">Mentioned</label>
                    </li>
                </ul>
                <Posts :posts="this.$store.getters.allPosts" :refresh="refreshHome"/>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import MiniUserProfile from './MiniUserProfile.vue'
import PostForm from './PostForm.vue'
import Posts from './Posts.vue'
import postService from '../services/posts.js'

  export default {
    name: 'Home',
    components: {
        Header, MiniUserProfile, PostForm, Posts
    },
    data: function() {
        return {
            followingCheck: false,
            likeCheck: false,
            dislikeCheck: false,
            commentCheck: false,
            mentionedCheck: false
        }
    },
    methods: {
        refreshHome: function() {
            this.$store.dispatch('getAllPosts');
            this.$store.dispatch('getUserDetails');
        },
        filterPosts: async function(event) {
            if(event.target.id === "setFollowingCheck") {
                this.followingCheck = event.target.checked
            }
            else if(event.target.id === "setLikeCheck") {
                this.likeCheck = event.target.checked
            }
            else if(event.target.id === "setDislikeCheck") {
                this.dislikeCheck = event.target.checked
            }
            else if(event.target.id === "setCommentedCheck") {
                this.commentCheck = event.target.checked
            }
            else if(event.target.id === "setMentionedCheck") {
                this.mentionedCheck = event.target.checked
            }

            await postService.getAll()
                .then(result => {
                    var newPosts = result.data
                    if(this.commentCheck) {
                        var userComments = []
                        for(var i = 0; i < this.$store.getters.userDetails.commented_posts.length; i++) {
                            userComments.push(this.$store.getters.userDetails.commented_posts[i].commented_post_id)
                        }
                        newPosts = newPosts.filter(p => userComments.includes(p.post_id))
                    }
                    if(this.followingCheck) {
                        var userFollowing = []
                        for(i = 0; i < this.$store.getters.userDetails.following.length; i++) {
                            userFollowing.push(this.$store.getters.userDetails.following[i].following_username)
                        }
                        newPosts = newPosts.filter(p => userFollowing.includes(p.author))
                    }
                    if(this.likeCheck) {
                        var userLikes = []
                        for(i = 0; i < this.$store.getters.userDetails.liked_posts.length; i++) {
                            userLikes.push(this.$store.getters.userDetails.liked_posts[i].liked_post_id)
                        }
                        newPosts = newPosts.filter(p => userLikes.includes(p.post_id))
                    }
                    if(this.dislikeCheck) {
                        var userDislikes = []
                        for(i = 0; i < this.$store.getters.userDetails.disliked_posts.length; i++) {
                            userDislikes.push(this.$store.getters.userDetails.disliked_posts[i].disliked_post_id)
                        }
                        newPosts = newPosts.filter(p => userDislikes.includes(p.post_id))
                    }
                    if(this.mentionedCheck) {
                        var mentionedPostIDS = []
                        var allMentions = []
                        for(i = 0; i < newPosts.length; i++) {
                            allMentions = []
                            for(var j = 0; j < newPosts[i].mentions.length; j++) {
                                allMentions.push(newPosts[i].mentions[j].mention_username)
                            }
                            if(allMentions.includes(this.$store.getters.userDetails.username)) {
                                mentionedPostIDS.push(newPosts[i].post_id)
                            }
                        }
                        newPosts = newPosts.filter(p => mentionedPostIDS.includes(p.post_id))
                    }
                    this.$store.commit('change', {
                        name: "allPosts",
                        value: newPosts
                    })
                })
        }
    },
    created: function() {
        this.refreshHome()
    }
  }
</script>