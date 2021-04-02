const User = require("../../models/user.model");
const cloudinary = require('./modelCloud')

module.exports.index = async (req, res) => {
    const { id, name, email } = req.body;
    const check = await User.findOne({ email: email });
    if(check){
        res.json({
            errorCode : 1,
            message: 'Email đã được sử dụng cho tài khoản khác'
        })
    }
    const user = await User.findById(id);
    user.name = name;
    user.email = email;
    await User.findByIdAndUpdate(id, user);
    res.json({
        errorCode: 0,
        message: 'done'
    });
}

module.exports.changeAvt = async (req, res) => {
        const result = {
            errorCode: 0,
            message: '',
            avt: ''
        }
        const userId = req.body.userId;
        const user = await User.findById(userId);
        await cloudinary.uploadSingle(req.file.path).then(async (res) => {
            user.avt = res.thumb1;
            await User.findByIdAndUpdate(userId, user);
            if(res.url){
                result.message = 'Thay đổi ảnh đại diện thành công';
                result.avt = res.url;
            } else {
                result.message = 'Thay đổi ảnh đại diện thất bại';
            }
        })
        res.json(result);
}