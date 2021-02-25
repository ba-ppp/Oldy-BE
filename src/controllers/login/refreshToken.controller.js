const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const refreshToken = async (req, res) => {
  const result = {
    error: '',
    token: '',
    errorCode: 0
  };

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
      //fake id
      result.errorCode = 1;
      result.error = "This is not a valid id";
      res.json(result);
    } else {
      // infor of user
      const user = data;
      console.log(user);
      refreshToken = user.refreshToken;
      let newToken = "";

      await jwt.verify(
        refreshToken,
        publicRefreshKey,
        { algorithms: ["RS256"] },
        async function (err, decoded) {
          if (err) {
            // refresh token expired
            if (err.message === "jwt expired") {
              result.errorCode = 1;
              result.error = "Refresh token expired";
            }
          } else {
            // if refreshtoken is not expired
            newToken = jwt.sign(
              {
                _id: user._id,
                username: user.username,
                email: user.email,
              },
              privateTokenKey,
              { algorithm: "RS256", expiresIn: process.env.EXPIRESIN_TOKEN }
            );
          }
        }
      );
      result.token = newToken;
      // update new refreshtoken to db
      res.json(result);
    }
  });
};

module.exports.refreshToken = refreshToken;
