const Post = require("../../models/post.model");

module.exports.index = async (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;

    const post = await Post.findById(postId);
    
    const likes = post.likes;
    const check = likes.indexOf(userId);
    if (check === -1){
        likes.push(userId);
    } else {
        likes.splice(check,1);
    }
    await Post.findByIdAndUpdate(postId, { likes: likes });
    res.json('ok');
} 