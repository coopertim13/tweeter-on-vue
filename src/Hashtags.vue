<template>
    <div>
        <Header title="Hashtags"></Header>
        <div className="row">
            <div className="column middle-content">
                <div className = "allPosts">
                    <ul v-if="this.$store.getters.allHashtags" className = "postListOuter">
                        <center>
                            <li v-for="(tag, index) in this.$store.getters.allHashtags" :key=index className = "hashtagBox" :id="tag.hashtag">
                                <div className="hashOnly">
                                    <a className="postLink notBold" :href = "'/hashtags/'+tag.hashtag"><strong className="hashItself">#</strong></a>
                                </div>
                                <div className="hashtagProperties">
                                    <a className="postLink notBold blackLink" :href = "'/hashtags/'+tag.hashtag">
                                        <center>
                                            <h1 className="hashtagHashtag">{{tag.hashtag}}</h1>
                                            <p className="hashtagCount"><strong>{{tag.count}} </strong> tags</p>
                                        </center>
                                    </a>
                                </div>
                            </li>
                        </center>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'

export default {
    name: 'Hashtags',
    components: {
        Header
    },
    created: function() {
        this.$store.dispatch('getAllHashtags')
    }
}
</script>