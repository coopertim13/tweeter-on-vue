<template>
    <div>
        <Header title="Users"></Header>
        <div className="row">
            <div className="column middle-content">
                <div className = "allPosts allUsers">
                    <ul v-if="this.$store.getters.allUsers" className = "postListOuter">
                        <center>
                            <li v-for="(user, index) in this.$store.getters.allUsers" :key=index className = "postListInner userProfileInner">
                                <a className="postLink extendLink" :href = "'/users/' + user.username">
                                    <MiniUserProfile :user="user"></MiniUserProfile>
                                </a>
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
    import MiniUserProfile from './MiniUserProfile.vue'
    export default {
        name: 'Users',
        components: {
            Header, MiniUserProfile
        },
        created: function() {
            this.$store.dispatch('getAllUsers')
        }
    }
</script>