const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    first_name: String,
    last_name: String,
    age: Number,
    email: String,
    profile_picture: String,
    followers: [{
        follower_username: String
    }],
    following: [{
        following_username: String
    }],
    liked_posts: [{
        liked_post_id: String
    }],
    disliked_posts: [{
        disliked_post_id: String
    }],
    commented_posts: [{
        commented_post_id: String
    }],
    posts: [{
        post_id: String
    }]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)