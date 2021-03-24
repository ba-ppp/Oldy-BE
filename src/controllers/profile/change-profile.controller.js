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

module.exports.changeAvt = async (req, res, next) => {
        //req.file.path chính là đường dẫn của file khi upload bằng multer
        const userId = req.body.userId;
        const user = await User.findById(userId);
        cloudinary.uploadSingle(req.file.path).then(async (result) => {

            user.avt = result.url;
            await User.findByIdAndUpdate(userId, user);
            // let imageDetails = {
            //     imageName: req.body.imageName || '',
            //     cloudImage: result.url,
            //     imageId: result.id
            // }
        })
        
        res.json(req.file)
}