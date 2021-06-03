const Post = require("../../models/post.model");

module.exports.index = async (req, res) => {
    const { caption, images, userId } = req.body;
    if(!caption || !images || !userId)
        res.json({
            errorCode: 1,
            message: 'Đăng bài không thành công'
        })
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
        errorCode: 0,
        message: 'Đăng bài thành công'
    })
}
