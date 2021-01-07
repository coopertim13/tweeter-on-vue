<template>
    <div>
        <Header :title="'#'+this.$route.params.tag"></Header>
        <div className="row">
            <div className="column middle-content">
                <Posts :posts="hashtagPosts" :refresh="refreshHashtag"></Posts>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue'
import Posts from './Posts.vue'
import hashtagService from '../services/hashtag.js'

export default {
    name: 'Hashtag',
    data: function() {
        return {
            hashtagPosts: null
        }
    },
    components: {
        Header, Posts
    },
    methods: {
        refreshHashtag: async function() {
            await hashtagService.get_hashtag(this.$route.params.tag)
                .then(result => {
                    this.hashtagPosts = result.data.result
                })
                .catch(error => {

                })
        }
    },
    created: function() {
        this.refreshHashtag()
    }
}
</script>