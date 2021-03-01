const Post = require("../../models/post.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    let result = {
        errorCode : 1,
    };
    let data = [];
    

    let posts = await Post.find();
    if (posts) {
        result.errorCode = 0;

        for (post of posts) {
            let info = {};
            info.post = post;
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