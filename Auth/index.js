const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

// starting server
const app = express();

// middleware
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());
// connecting mongodb
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "auth",
  })
  .then(() => console.log("congo D-Base is Connected"))
  .catch((e) => console.log(e));

// Schema is creeated  here
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
// using schema and create a model here
const User = mongoose.model("User", userSchema);

const isAuthecaited = async (req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    // decodeding the token from cookies
    // and verfiying
    const decoded = jwt.verify(token, "secretevaluekeyanyting");
    // find the user details by id and later send down for accessing name and other details
    req.user = await User.findById(decoded._id);
    next();
  } else {
    res.redirect("/login");
  }
};

// GET Routes here
app.get("/", isAuthecaited, (req, res) => {
  res.render("logout", { name: req.user.name });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

// POST Routes here
app.post("/register", async (req, res) => {
  // data getting from body
  const { name, email, password } = req.body;

  // check user is already created or not
  let user = await User.findOne({ email });
  // exisiting user means login is go to option
  if (user) return res.redirect("/login");

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create a entity in DataBase
  user = await User.create({ name, email, password: hashedPassword });
  // token aka userid in brwoser
  const userID = jwt.sign({ _id: user._id }, "secretevaluekeyanyting");

  // cookie is created and store
  res.cookie("token", userID, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });

  res.redirect("/");
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) return res.redirect("/register");
  // checking the password
  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck)
    return res.render("login", { email, message: "Incorrect password" });

  const userID = jwt.sign({ _id: user._id }, "secretevaluekeyanyting");

  res.cookie("token", userID, {
    httpOnly: true,
    exprire: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});
// connection setup
app.listen(3000, () => {
  console.log("server is working");
});
