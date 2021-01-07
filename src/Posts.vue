<template>
    <div className = "allPosts">
        <ul v-if="this.posts" className = "postListOuter">
            <li v-for="(post, index) in this.posts" :key=index className = "postListInner">
                <div className = "postBody">
                    <div className = "postUserAndTime">
                        <h2 className = "userNamePost"><a className = "postLink" href = "#">{{post.author}}</a></h2>
                        <h4 className = "userNameDate">{{post.date}}</h4>
                    </div>
                    <p v-html=post.content className = "postContent"></p>
                    <img alt = "profilePicture" className="postProfilePicture" :src = "getImg(post.author_profile_picture)"/>
                    <Delete :tweet="post"/>
                </div>
                <div className = "postStatsBar">
                    <div className = "likeDislike">
                        <LikeDislike/>
                    </div>
                    <div className = "statsText">
                        <span className="pointerObject"><strong>{{post.likes.length}}</strong> likes</span>, <span className="pointerObject"><strong>{{post.dislikes.length}}</strong> dislikes</span>, <strong>{{post.comments.length}}</strong> comments
                    </div>
                </div>
                    <div v-for="(comment, index) in post.comments" :key=index className = "commentDisplay">
                        <div className = "commentDisplayUser">
                            <div className = "commentComment">
                                <a href = "#" className="postLink blackLink notBold"><strong>{{comment.comment_username}}</strong></a><br/>
                                <span className = "commentDate">{{comment.comment_date}}</span>
                            </div>
                            <img alt = "profilePicture" className="postProfilePicture commentDP" :src = "this.getImg(comment.comment_username_profile_picture)" width="30"/>
                        </div>
                        <div className = "commentDisplayComment">
                            {{comment.comment_content}}
                        </div>
                    </div>
                <Comment/>
            </li>
        </ul>
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
    props: {
        posts: Object,
        refresh: Function
    }
}
</script>