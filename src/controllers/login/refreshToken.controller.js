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
  const publicTokenKey = fs.readFileSync(
    path.resolve(__dirname, "./keys/publicToken.key")
  );

  const privateRefreshKey = fs.readFileSync(
    path.resolve(__dirname, "./keys/privateRefresh.key")
  );
  const publicRefreshKey = fs.readFileSync(
    path.resolve(__dirname, "./keys/publicRefresh.key")
  );

  // token
  const id = req.body.id;
  let refreshToken = "";

  User.findOne({ _id: id }, async function (err, data) {
    if (!data) {
      res.json({ error: "This is not a valid id" });
    } else {
      const user = data;
      refreshToken = user.refreshToken;
      let newToken = "";
      let newRefreshToken = "";

      await jwt.verify(
        refreshToken,
        publicRefreshKey,
        { algorithms: ["RS256"] },
        async function (err, decoded) {
          if (err) {
            // refresh token expired
            console.log(err.message);
            if (err.message === "jwt expired") {
              newToken = jwt.sign(
                {
                  _id: user._id,
                  username: user.username,
                },
                privateTokenKey,
                { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
              );

              // new refresh token
              newRefreshToken = jwt.sign(
                {
                  username: user.username,
                  _id: user._id,
                },
                privateRefreshKey,
                {
                  algorithm: "RS256",
                  expiresIn: process.env.EXPIRESIN_REFRESHTOKEN,
                }
              );
            } else {
              result.error = "This is not a token";
            }
          } else {
            newToken = jwt.sign(
              {
                _id: user._id,
                username: user.username,
              },
              privateTokenKey,
              { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
            );
          }
        }
      );
      result.token = newToken;
      // update new refreshtoken to db
      await User.updateOne({ _id: user._id }, { refreshToken: refreshToken });
      res.json(result);
    }
  });
};

module.exports.refreshToken = refreshToken;
