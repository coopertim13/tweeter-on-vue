const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const stripHtml = require('string-strip-html')
const { uuid } = require('uuidv4')
const User = require('./models/user.js')
const Post = require('./models/post.js')
const path = require("path")
const serveStatic = require('serve-static')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', serveStatic(path.join(__dirname, '../dist')))

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

app.post('/api/login', async (request, response) => {
  
  const {username, password} = request.body

  await User.findOne({username: username}).lean()
    .then(async result => {
      if(result == null) {
        return response.status(401).json({Error: 'Invalid username or password'})
      }
      else {
        const user = result.username
        const fullName = result.name
        const profilePicture = result.profile_picture
        await bcrypt.compare(password, result.password)
          .then(async result => {
            if(result) {
              const userForToken = {
                username: user,
                name: fullName,
                profile_picture: profilePicture
              }
              const token = jwt.sign(userForToken, process.env.TOKEN_SECRET)
              return response.status(200).json({token, username: user, profile_picture: profilePicture})
            }
            else {
              return response.status(401).json({Error: 'Invalid username or password'})
            }
          })
          .catch(async (error) => {
            return response.status(401).json({Error: error})
          })
      }
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.post('/api/register', async (request, response) => {

  const {username, password, firstName, lastName, email, age, profilePicture} = request.body

  const fullName = firstName + " " + lastName
  await bcrypt.hash(password, 10)
    .then(async result => {
      const user = new User({
        username: username,
        password: result,
        first_name: firstName,
        last_name: lastName,
        age: age,
        email: email,
        profile_picture: profilePicture,
        followers: [],
        following: [],
        liked_posts: [],
        disliked_posts: [],
        commented_posts: [],
        posts: []
      })
      await user.save()
        .then(async result => {
          const userForToken = {
            username: username,
            name: fullName,
            profile_picture: profilePicture
          }
          const token = jwt.sign(userForToken, process.env.TOKEN_SECRET)
          return response.status(200).json({token, username: username, profile_picture: profilePicture})
        })
        .catch(async (error) => {
          return response.status(401).json({Error: 'User unable to be created, most likely because it already exists.'})
        })
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/home_authenticated', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }

  const user = decodedToken.username

  var userDetails

  await User.findOne({username: user}).lean() //fetch user profile
    .then(async result => {
      userDetails = result
      await Post.find({}).lean() //posts
        .then(async posts => {
          return response.status(200).json({userDetails, posts})
        })
        .catch(async (error) => {
          return response.status(401).json({error})
        })
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/profile_user', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }
  
  const user = request.query.profileName.substring(1, request.query.profileName.length-1)
  const userName = request.query.user.substring(1, request.query.user.length-1)

  var userProfile
  var userPostIDs = []

  var userPosts
  var isTrue

  await User.findOne({username: user}).lean()
    .then(async result => {
      userProfile = result
      if(result == null) {
        userProfile = null
        userPosts = null
        return response.status(200).json({userProfile, userPosts})
      }
      for(var i = 0; i < result.posts.length; i++) {
          userPostIDs.push(result.posts[i].post_id)
      }
      await Post.find({}).lean()
        .then(async result => {
          userPosts = result.filter(p => userPostIDs.includes(p.post_id))
          await User.findOne({username: user}).lean()
            .then(async result => {
              if(result.followers.filter(p => p.follower_username === userName)[0]) {
                isTrue = true
              }
              else {
                isTrue = false
              }
              return response.status(200).json({userProfile, userPosts, isTrue})
            })
            .catch(async (error) => {
              return response.status(401).json({Error: error})
            })
        })
        .catch(async (error) => {
          return response.status(401).json({Error: error})
        })
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/profile_guest', async (request, response) => {
  
  const user = request.query.profileName.substring(1, request.query.profileName.length-1)

  var userProfile
  var userPostIDs = []

  var userPosts

  await User.findOne({username: user}).lean()
    .then(async result => {
      userProfile = result
      if(result == null) {
        userProfile = null
        userPosts = null
        return response.status(200).json({userProfile, userPosts})
      }
      for(var i = 0; i < result.posts.length; i++) {
          userPostIDs.push(result.posts[i].post_id)
      }
      await Post.find({}).lean()
        .then(async result => {
          userPosts = result.filter(p => userPostIDs.includes(p.post_id))
          return response.status(200).json({userProfile, userPosts})
        })
        .catch(async (error) => {
          return response.status(401).json({Error: error})
        })
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/profile_picture', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }

  return response.status(200).json(decodedToken.profile_picture)
})

app.get('/api/fetch', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }

  const user = decodedToken.username

  await User.findOne({username: user}).lean()
    .then(async result => {
      return response.status(200).json({result})
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.post('/api/post_comment', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }

  const user = decodedToken.username
  const profilePicture = decodedToken.profile_picture

  var aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
  var components = aestTime.split('/')
  var finalDate = components[1]+"/"+components[0]+"/"+components[2]

  Post.updateOne(
    { post_id: request.body.post },
    { $push: { comments: {comment_date: finalDate, comment_username: user, comment_username_profile_picture: profilePicture, comment_content: request.body.comment} }}
  )
  .then(result => {
    User.updateOne(
      { username: user },
      { $push: { commented_posts: {commented_post_id: request.body.post}}}
    )
    .then(result => {
      return response.status(200).json({Success: "Comment added successfully!"})
    })
    .catch((error) => {
      return response.status(401).json({Error: error})
    })
  })
  .catch((error) => {
    return response.status(401).json({Error: error})
  })
})

app.post('/api/post_tweet', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }

  const user = decodedToken.username
  const profilePicture = decodedToken.profile_picture
  const postID = String(uuid())
  
  await User.updateOne(
    { username: user },
    { $push: { posts: {post_id: postID} }}
  ).then(async result => {
    
  })
  .catch(async (error) => {
    return response.status(401).json({Error: "Unable to edit users' posts"})
  })

  var aestTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"});
  var components = aestTime.split('/')
  var finalDate = components[1]+"/"+components[0]+"/"+components[2]

  const mentions = (request.body.post).match(/@\S+/g)
  const hashtags = (request.body.post).match(/#\S+/g)

  var finalMentions = '['
  var finalHashtags = '['

  var newString = stripHtml(request.body.post).result

  if(mentions) {
    for(let i = 0; i < mentions.length; i++) {
      var re = new RegExp(mentions[i],"g");
      newString = newString.replace(re, "<a class = 'postLink' href = '/users/"+mentions[i].substring(1)+"'>"+mentions[i]+"</a>")
      finalMentions = finalMentions + '{"mention_username": "'+mentions[i].substring(1)+'"},'
    }
    finalMentions = (finalMentions.slice(0, -1)) + ']'
  }
  else {
    finalMentions = finalMentions + ']'
  }
  if(hashtags) {
    for(let i = 0; i < hashtags.length; i++) {
      var re = new RegExp(hashtags[i],"g");
      newString = newString.replace(re, "<a class = 'postLink' href = '/hashtags/"+hashtags[i].substring(1)+"'>"+hashtags[i]+"</a>")
      finalHashtags = finalHashtags + '{"hashtag_content": "'+hashtags[i].substring(1)+'"},'
    }
    finalHashtags = (finalHashtags.slice(0, -1)) + ']'
  }
  else {
    finalHashtags = finalHashtags + ']'
  }

  finalMentionsObject = JSON.parse(finalMentions);
  finalHashtagsObject = JSON.parse(finalHashtags);

  const post = new Post({
    post_id: postID,
    date: finalDate,
    content: newString,
    author: user,
    author_profile_picture: profilePicture,
    likes: [],
    dislikes: [],
    mentions: finalMentionsObject,
    hashtags: finalHashtagsObject,
    comments: []
  })
  await post.save()
    .then(async result => {
      return response.status(200).json({post})
    })
    .catch(async (error) => {
      return response.status(401).json({Error: 'Post unable to be created'})
    })
  
})

app.get('/api/follow_state', async (request, response) => {
  
  const profileName = request.query.profileName.substring(1, request.query.profileName.length-1)
  const userName = request.query.user.substring(1, request.query.user.length-1)

  await User.findOne({username: profileName}).lean()
    .then(async result => {
      if(result.followers.filter(p => p.follower_username === userName)[0]) {
        return response.status(200).json(true)
      }
      else {
        return response.status(200).json(false)
      }
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
    
})

app.get('/api/get_hashtag', async (request, response) => {
  const hashtag = request.query.hashtag.substring(1, request.query.hashtag.length-1)

  await Post.find({"hashtags.hashtag_content": hashtag}).lean()
    .then(result => {
      return response.status(200).json({result})
    })
    .catch((error) => {
      return response.status(401).json({Error: error})
    })

})

app.get('/api/likes', async (request, response) => {
  const postID = request.query.post_id.substring(1, request.query.post_id.length-1)
  await Post.findOne({post_id: postID}).lean()
    .then(async result => {
      const likes = result.likes
      return response.status(200).json({likes})
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/dislikes', async (request, response) => {
  const postID = request.query.post_id.substring(1, request.query.post_id.length-1)
  await Post.findOne({post_id: postID}).lean()
    .then(async result => {
      const dislikes = result.dislikes
      return response.status(200).json({dislikes})
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/following', async (request, response) => {
  const username = request.query.username.substring(1, request.query.username.length-1)
  await User.findOne({username: username}).lean()
    .then(async result => {
      const following = result.following
      return response.status(200).json({following})
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/followers', async (request, response) => {
  const username = request.query.username.substring(1, request.query.username.length-1)
  await User.findOne({username: username}).lean()
    .then(async result => {
      const followers = result.followers
      return response.status(200).json({followers})
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/user', async (request, response) => {
  
  const user = request.query.user.substring(1, request.query.user.length-1)

  await User.findOne({username: user}).lean()
    .then(async result => {
      return response.status(200).json({result})
    })
    .catch(async (error) => {
      return response.status(401).json({Error: error})
    })
})

app.delete('/api/post', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)

  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }
  
  const tokenUser = decodedToken.username
  const userInRequest = request.query.user.substring(1, request.query.user.length-1)

  if(tokenUser !== userInRequest) {
    return response.status(401).json({Error: "You are not who you say you are!"})
  }

  const postID = JSON.parse(request.query.post).post_id
  await Post.deleteOne({ post_id: postID })
    .then(async result => {
      await User.updateOne(
        { username: tokenUser },
        { $pull: { posts: {post_id: postID}}}
      ).then(result => {
        return response.status(200).json({Success: "Post successfully deleted!"})
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
    })
    .catch((error) => {
      return response.status(401).json({Error: error})
    })
})

app.get('/api/users', async (request, response) => {
  await User.find({}).lean()
    .then(result => {
      return response.status(200).json(result)
    })
    .catch((error) => {
      return response.status(401).json({error})
    })
})

app.get('/api/hashtags', async (request, response) => {
  var allHashtags = []
  await Post.find({}).lean()
    .then(async result => {
      for(var i = 0; i < result.length; i++) {
        for(var j = 0; j < result[i].hashtags.length; j++) {
          allHashtags.push(result[i].hashtags[j].hashtag_content)
        }
      }
    })
    .catch((error) => {
      return response.status(401).json({error})
    })

  var count = {};
  allHashtags.forEach(function(i) { count[i] = (count[i]||0) + 1;});
  var ordered = {};
  Object.keys(count).sort().forEach(function(key) {
    ordered[key] = count[key];
  });

  var arr = [];
  for (var key in ordered) {
    if (ordered.hasOwnProperty(key)) {
      arr.push({"hashtag": key, "count": ordered[key]})
    }
}

  return response.status(200).json({arr})
})

app.get('/api/posts', async (request, response) => {
  
  await Post.find({}).lean()
    .then(async result => {
      return response.status(200).json(result)
    })
    .catch(async (error) => {
      return response.status(401).json({error})
    })
})

app.put('/api/follow_user', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }

  const user = decodedToken.username
  if(user !== request.body.username) {
    return response.status(401).json({Error: "You are not who you say you are!"})
  }
  
  await User.updateOne( //update logged in user's following list
    { username: request.body.username },
    { $push: { following: {following_username: request.body.profileName}}}
  ).then(result => {
  }).catch((error) => {
    return response.status(401).json({Error: error})
  })

  await User.updateOne( //update profile user's followers list
    { username: request.body.profileName },
    { $push: { followers: {follower_username: request.body.username}}}
  ).then(result => {
    return response.status(200).json({Success: "Follow updated successfully"})
  }).catch((error) => {
    return response.status(401).json({Error: error})
  })
})

app.put('/api/unfollow_user', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }

  const user = decodedToken.username
  if(user !== request.body.username) {
    return response.status(401).json({Error: "You are not who you say you are!"})
  }

  await User.updateOne( //update logged in user's following list
    { username: request.body.username },
    { $pull: { following: {following_username: request.body.profileName}}}
  ).then(result => {
  }).catch((error) => {
    return response.status(401).json({Error: error})
  })

  await User.updateOne( //update profile user's followers list
    { username: request.body.profileName },
    { $pull: { followers: {follower_username: request.body.username}}}
  ).then(result => {
    return response.status(200).json({Success: "Follow updated successfully"})
  }).catch((error) => {
    return response.status(401).json({Error: error})
  })
})

app.put('/api/like_dislike', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
  if(!token || !decodedToken.username) {
    return response.status(401).json({Error: "Invalid Token"})
  }

  const user = decodedToken.username

  if(request.body.setTo == null) { //remove like/dislike from user, remove user from post
    if(request.body.buttonPressed === "like") {
      User.updateOne(
        { username: user },
        { $pull: { liked_posts: {liked_post_id: request.body.post.post_id}}}
      ).then(result => {
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
  
      Post.updateOne(
        { post_id: request.body.post.post_id },
        { $pull: { likes: {like_username: user}}}
      ).then(result => {
        return response.status(200).json({Success: "Post updated"})
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
    }
    else {
      User.updateOne(
        { username: user },
        { $pull: { disliked_posts: {disliked_post_id: request.body.post.post_id}}}
      ).then(result => {
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
  
      Post.updateOne(
        { post_id: request.body.post.post_id },
        { $pull: { dislikes: {dislike_username: user}}}
      ).then(result => {
        return response.status(200).json({Success: "Post updated"})
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
    }
  }
  else { //add like/dislike to user, add user to post, ensure other option is removed
    if(request.body.buttonPressed === "like") {
      User.updateOne(
        { username: user },
        { $push: { liked_posts: {liked_post_id: request.body.post.post_id}}}
      ).then(result => {
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })

      Post.updateOne(
        { post_id: request.body.post.post_id },
        { $push: { likes: {like_username: user}}}
      ).then(result => {
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })

      User.updateOne(
        { username: user },
        { $pull: { disliked_posts: {disliked_post_id: request.body.post.post_id}}}
      ).then(result => {
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
  
      Post.updateOne(
        { post_id: request.body.post.post_id },
        { $pull: { dislikes: {dislike_username: user}}}
      ).then(result => {
        return response.status(200).json({Success: "Post updated"})
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
    }
    else {
      User.updateOne(
        { username: user },
        { $push: { disliked_posts: {disliked_post_id: request.body.post.post_id}}}
      ).then(result => {
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })

      Post.updateOne(
        { post_id: request.body.post.post_id },
        { $push: { dislikes: {dislike_username: user}}}
      ).then(result => {
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })

      User.updateOne(
        { username: user },
        { $pull: { liked_posts: {liked_post_id: request.body.post.post_id}}}
      ).then(result => {
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
  
      Post.updateOne(
        { post_id: request.body.post.post_id },
        { $pull: { likes: {like_username: user}}}
      ).then(result => {
        return response.status(200).json({Success: "Post updated"})
      }).catch((error) => {
        return response.status(401).json({Error: error})
      })
    }
  }
})

app.get('/.*/', (req, res) => { //doesn't try to load index.html file in current directory, always uses index.html in /build
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  const url = process.env.MONGO_URL
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
    })
    .catch((error) => {
    })
})