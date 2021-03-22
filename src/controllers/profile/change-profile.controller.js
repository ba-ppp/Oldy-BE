const User = require("../../models/user.model");


const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

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
    cloudinary.uploader.upload(req.file);
    res.json(req.file);
}