const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "firstdb",
  })
  .then(() => console.log("Data base connnected"))
  .catch((e) => console.log(e));

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const Message = mongoose.model("Message", messageSchema);
const app = express();
const user = [];
// middleware down
app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(cookieParser());

app.get("/", (req, res) => {
  const { token } = req.cookies;
  // console.log(token);
  if (token) {
    res.render("logout");
  } else {
    res.render("login");
  }
});
app.get("/success", (req, res) => {
  const userdata = { username: req.body.name, email: req.body.email };
  res.render("success");
});
app.post("/contact", async (req, res) => {
  const userdata = { username: req.body.name, email: req.body.email };
  await Message.create({ name: req.body.name, email: req.body.email });
  console.log(userdata);
  res.redirect("/success");
});
app.post("/login", (req, res) => {
  res.cookie("token", "nadeemin", {
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
app.get("/about", (req, res) => {
  res.send("about page hai ");
});
app.get("/add", async (req, res) => {
  //
  const { name, email } = req.body;
  await Message.create({ name: name, email: email }).then(() =>
    res.send("nice")
  );
  // Message.create({ name: "nadeem", email: "test@gmail" }).then(() =>
  //   res.send("nice")
  // );
});
app.get("/user", (req, res) => {
  res.json({ user });
});
app.listen(5000, () => {
  console.log("server is working");
});
