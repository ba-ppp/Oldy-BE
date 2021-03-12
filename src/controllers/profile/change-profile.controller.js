const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    const { id, name, username, email } = req.body;
    const user = await User.findById(id);
    console.log(name);
    user.name = name;
    user.username = username;
    user.email = email;
    await User.findByIdAndUpdate(id, user);
    const newUser = await User.findById(id);
    console.log(newUser);
    res.json('done');
}