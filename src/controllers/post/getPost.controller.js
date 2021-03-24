const Post = require("../../models/post.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const userId = req.body.userId;

    let result = { // return this data
        errorCode : 1,
    };
    let data = [];

    let posts = await Post.find(); // get post
    
    if (posts) {
        result.errorCode = 0;
        for (post of posts) {
            // post
            let newpost = {
                likes: post.likes,
                _id: post._id,
                userId: post.userId,
                caption: post.caption,
                image: post.image,
                liked: post.liked
            }

            // check this user liked post
            if (post.likes.indexOf(userId) !== -1) {
                newpost.liked = true;
            } else {
                newpost.liked = false;
            }

            let info = {}; // info user post
            info.post = newpost;
            let user = await User.findById(post.userId);
            info.user = {
                username: user.username,
                avt: user.avt,
            };
            data.push(info)
        }
        result.posts = data;
    }
    res.json(result);
};