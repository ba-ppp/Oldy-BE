require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const loginRoute = require("./src/routes/login.route");
const registerRoute = require("./src/routes/register.route");
const forgetRoute = require("./src/routes/forget-pass.route");

app.listen(port, () => {
  console.log("App listening on port", port);
});
app.get("/", function (req, res) {
  res.sendStatus(200);
});

app.use("/login", loginRoute);

app.use("/register", registerRoute);

app.use("/forget", forgetRoute);
