const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const { id, name, email } = req.body;
    const check = await User.findOne({ email: email });
    if(check){
        res.json({
            errorCode : 1,
            message: 'Email was used for another account'
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