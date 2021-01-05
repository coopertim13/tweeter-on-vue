const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const postSchema = new mongoose.Schema({
    post_id: {
        type: String,
        unique: true
    },
    date: String,
    content: String,
    author: String,
    author_profile_picture: String,
    likes: [{
        like_username: String
    }],
    dislikes: [{
        dislike_username: String
    }],
    mentions: [{
        mention_username: String
    }],
    hashtags: [{
        hashtag_content: String
    }],
    comments: [{
        comment_date: String,
        comment_username: String,
        comment_username_profile_picture: String,
        comment_content: String
    }]
})

postSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Post', postSchema)