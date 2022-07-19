const bcrypt = require("bcrypt");

const User = require('../models/User')
const Post = require('../models/Post')
const Token = require('../models/Token')
const Helper = require('../utils/helper');
const { postSchema } = require('../utils/validation/postValidations');


exports.postCreate = async (req, res) => {
    let post = req.body.post;
    let userId = req.user.id
    post.authorId = userId;
    
    //basic validation
    const postValidationResult = postSchema.validate(post)
    if(postValidationResult.error)
        return res.status(422).json({ error: postValidationResult.error.details[0].message });

    post = new Post(post);
    post.save().then(result=>{
        return res.status(201).json({result: result})
    })
    .catch(error=>res.status(500).json({error: error}));
}

exports.postUpdate = async (req, res) => {
    let updatePost = req.body.post;
    let userId = req.body.userId
    let postId = req.params.postId
    
    //basic validation
    const postValidationResult = postSchema.validate(updatePost)
    if(postValidationResult.error)
        return res.status(422).json({ error: postValidationResult.error.details[0].message });

    const post = await Post.findById(postId);
    if (post.authorId === userId) {
        await post.updateOne({ $set: updatePost });
        res.status(200).json("the post has been updated");
    } else {
        res.status(403).json("you can update only your post");
    }
}

exports.postDelete = async (req, res) => {
    let userId = req.body.userId
    let postId = req.params.postId

    const post = await Post.findById(postId);
    if (post.authorId === userId) {
        await post.deleteOne();
        res.status(200).json("the post has been delete");
    } else {
        res.status(403).json("you can delete only your post");
    }
}

exports.getPost = async (req, res) => {
    let postId = req.params.postId;

    const post = await Post.findById(postId);
    res.state(200).json(post);
}


exports.postLikeDislike = async (req, res) => {
    const postId = req.params.postId
    const currentUserId = req.user.id

    const post = await Post.findById(postId);
    if (!post.likes.includes(currentUserId)) {
      await post.updateOne({ $push: { likes: currentUserId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: currentUserId } });
      res.status(200).json("The post has been disliked");
    }
}

exports.getTimelinePost = async (req, res) => {
    const currentUserId = req.user.id

    const currentUser = await User.findById(currentUserId);
    let userPosts = await Post.find({ authorId: currentUserId }).lean();
    
    userPosts = userPosts.map(post=> {
        post['authorName'] = currentUser.name;
        post['authorProfilePhoto'] = currentUser.profilePhoto || '';
        post['liked'] = post.likes.includes(currentUserId)
        return post
    })

    let friends = await User.find({'_id': { $in: currentUser.followings}}, { name: 1, profilePhoto: 1})
    let friendsObj = {}

    friends.forEach(user=> {
        friendsObj[user._id] = user
        delete friendsObj[user._id]._id
    })

    let friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
            return Post.find({ authorId: friendId }).lean();
        }));
    
    friendPosts = [].concat.apply([], friendPosts);
    friendPosts = friendPosts.map(post=> {
        post['authorName'] = friendsObj[post.authorId].name;
        post['authorProfilePhoto'] = friendsObj[post.authorId].profilePhoto || '';
        post['liked'] = post.likes.includes(currentUserId)
        return post
    })

    res.status(200).json({result: [...userPosts, ...friendPosts]});
}

exports.getAllPostsByUser = async (req, res) => {
    const userId = req.params.userId
    const currentUserId = req.user.id

    let posts = await Post.find({ authorId: userId }).lean();
    if(posts && posts.length){
        const authorIds = posts.map(post=> post.authorId);

        let users = await User.find({'_id': { $in: authorIds}}, { name: 1, profilePhoto: 1})
        let usersObj = {}

        users.forEach(user=> {
            usersObj[user._id] = user
            delete usersObj[user._id]._id
        })

        posts = posts.map(post=> {
            post['authorName'] = usersObj[post.authorId].name;
            post['authorProfilePhoto'] = usersObj[post.authorId].profilePhoto || '';
            post['liked'] = post.likes.includes(currentUserId)
            return post
        })
    }
    

    res.status(200).json({result: posts});
}