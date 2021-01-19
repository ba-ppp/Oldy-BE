const { login } = require("./login.controller");
const { refreshToken } = require("./refreshToken.controller");

module.exports.index = login;
module.exports.refreshToken = refreshToken;
