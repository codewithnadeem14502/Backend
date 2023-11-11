const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "firstdb",
  })
  .then(() => console.log("Data base connnected"))
  .catch((e) => console.log(e));

// const messageSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });

const userschema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// const Message = mongoose.model("Message", messageSchema);

const User = mongoose.model("User", userschema);

// setup the server
const app = express();

// middleware down
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "secreatwalal");

    req.user = await User.findById(decoded._id);
    next();
  } else {
    res.redirect("/login");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  res.render("logout", { name: req.user.name });
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }

  const hasedpassword = await bcrypt.hash(password, 10);
  // store in to the data base
  user = await User.create({ name, email, password: hasedpassword });

  const userID = jwt.sign({ _id: user._id }, "secreatwalal");

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

  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch)
    return res.render("login", { email, message: "Incorrect Password" });

  const userID = jwt.sign({ _id: user._id }, "secreatwalal");

  res.cookie("token", userID, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.get("/logout", (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});
// app.get("/success", (req, res) => {
//   const userdata = { username: req.body.name, email: req.body.email };
//   res.render("success");
// });

// app.post("/contact", async (req, res) => {
//   const userdata = { username: req.body.name, email: req.body.email };
//   await Message.create({ name: req.body.name, email: req.body.email });
//   console.log(userdata);
//   res.redirect("/success");
// });

// app.get("/about", (req, res) => {
//   res.send("about page hai ");
// });

// app.get("/add", async (req, res) => {
//   //
//   const { name, email } = req.body;
//   await Message.create({ name: name, email: email }).then(() =>
//     res.send("nice")
//   );
// Message.create({ name: "nadeem", email: "test@gmail" }).then(() =>
//   res.send("nice")
// );
// });

// app.get("/user", (req, res) => {
//   res.json({ user });
// });

app.listen(5000, () => {
  console.log("server is working");
});
