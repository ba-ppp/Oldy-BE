const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const refreshToken = async (req, res) => {
  const result = {};

  // key
  const privateTokenKey = fs.readFileSync(
    path.resolve(__dirname, "./keys/privateToken.key")
  );

  const privateRefreshKey = fs.readFileSync(
    path.resolve(__dirname, "./keys/privateRefresh.key")
  );
  const publicRefreshKey = fs.readFileSync(
    path.resolve(__dirname, "./keys/publicRefresh.key")
  );

  // refreshToken
  const refreshToken = req.body.refreshToken;
  // check token
  await jwt.verify(
    refreshToken,
    publicRefreshKey,
    { algorithms: ["RS256"] },
    async function (err, decoded) {
      // if not token
      if (err) {
        result.error = "This is not a token";
      } else {
        const id = decoded._id;
        const user = await User.findById(id);
        // new token
        const newToken = jwt.sign(
          {
            _id: user._id,
            email: user.email,
          },
          privateTokenKey,
          { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
        );

        // new refresh token
        const newRefreshToken = jwt.sign(
          {
            username: user.username,
            email: user.email,
          },
          privateRefreshKey,
          { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_REFRESHTOKEN }
        );

        result.token = newToken;
        result.refreshToken = newRefreshToken;
        // update new refreshtoken to db
        await User.updateOne({ _id: id }, { refreshToken: refreshToken });
      }
    }
  );
  res.json(result);
};

module.exports.refreshToken = refreshToken;
