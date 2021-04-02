const cloudinary = require('../profile/modelCloud');

module.exports.index = async (req, res) => {
    const result = {
        errorCode: 0,
        message: '',
        images: '',
    }
    const userId = req.body.userId;
    const user = await User.findById(userId);
    await cloudinary.uploadSingle(req.file.path).then(async (res) => {
        user.avt = res.thumb1;
        await User.findByIdAndUpdate(userId, user);
        if(res.url){
            result.message = 'Tải hình ảnh thành công';
            result.images = res.url;
        } else {
            result.message = 'Tải hình ảnh thất bại';
        }
    })
    res.json(result);
}