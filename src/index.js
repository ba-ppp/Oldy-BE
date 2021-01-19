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

const loginRoute = require("./routes/login.route");
const registerRoute = require("./routes/register.route");

app.listen(port, () => {
  console.log("App listening on port", port);
});
app.get("/", function (req, res) {
  res.sendStatus(200);
});

app.use("/login", loginRoute);

app.use("/register", registerRoute);
