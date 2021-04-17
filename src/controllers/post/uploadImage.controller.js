const cloudinary = require('../profile/modelCloud');
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const result = {
        errorCode: 0,
        message: '',
        url: ''
    }

    await cloudinary.uploadSingle(req.file.path, 'post').then(async (res) => {
        if(res.url){
            result.message = 'Tải hình ảnh thành công';
            result.url = res.url;
        } else {
            result.message = 'Tải hình ảnh thất bại';
            result.errorCode = 1;
        }
    })
    res.json(result);
}