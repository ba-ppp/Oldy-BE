const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const { id, name, username, email } = req.body;
    const user = await User.findById(id);
    user.name = name;
    user.username = username;
    user.email = email;
    await User.findByIdAndUpdate(id, user);
    res.json('done');
}