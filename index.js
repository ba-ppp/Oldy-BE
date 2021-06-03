require("dotenv").config();
const express = require("express");

const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
mongoose.connect(process.env.MONGO_URL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRoute = require("./src/routes/login.route");
const registerRoute = require("./src/routes/register.route");
const forgetRoute = require("./src/routes/forget-pass.route");
const changePassRoute = require("./src/routes/change-pass.route");
const postRoute = require("./src/routes/getPost.route");
const profileRoute = require("./src/routes/profile.route");

app.listen(port, () => {
  console.log("App listening on port", port);
});
app.get("/", function (req, res) {
  res.sendStatus(200);
});

app.use("/api/login", loginRoute);

app.use("/api/registration", registerRoute);

app.use("/api/password/forget", forgetRoute);

app.use("/api/password/change-password", changePassRoute);

app.use("/api/post", postRoute);

app.use("/api/profile", profileRoute);
