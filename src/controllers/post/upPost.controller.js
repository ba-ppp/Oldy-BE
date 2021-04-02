const Post = require("../../models/post.model");

module.exports.index = async (req, res) => {
    const { caption, images, userId } = req.body;
    const post = {
        userId: userId,
        caption: caption,
        image: images,
        likes: [],
        comments: {},
        liked: false,
    }

    await Post.create(post);
    res.json({
        message: 'Đăng bài thành công'
    })
}
