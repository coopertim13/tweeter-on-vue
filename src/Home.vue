<template>
    <div>
        <Header title="Home"/>
        <div className="row">
            <div className="column left-profile">
                <div className = "inner-side-col">
                    <div className = "inner-side-col-wrap">
                        <MiniUserProfile/>
                    </div>
                </div>
            </div>
            <div className="column middle-content">
                <PostForm/>
                <ul className="filterOptions">
                    <li>
                        <input type="checkbox" className="switch" id="setFollowingCheck"/>
                        <label for="s1">Following</label>
                    </li>
                    <li>
                        <input type="checkbox" className="switch" id="setLikeCheck"/>
                        <label for="s2">Liked</label>
                    </li>
                    <li>
                        <input type="checkbox" className="switch" id="setDislikeCheck"/>
                        <label for="s2">Disliked</label>
                    </li>
                    <li>
                        <input type="checkbox" className="switch" id="setCommentedCheck"/>
                        <label for="s2">Commented</label>
                    </li>
                    <li>
                        <input type="checkbox" className="switch" id="setMentionedCheck"/>
                        <label for="s2">Mentioned</label>
                    </li>
                </ul>
                <Posts/>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import MiniUserProfile from './MiniUserProfile.vue'
import PostForm from './PostForm.vue'
import Posts from './Posts.vue'
  export default {
    name: 'Home',
    components: {
        Header, MiniUserProfile, PostForm, Posts
    },
    beforeCreate: function() {
        this.$store.dispatch('getAllPosts');
        this.$store.dispatch('getUserDetails');
    }
  }
</script>