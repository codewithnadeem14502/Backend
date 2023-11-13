const express = require("express");
const mongoose = require("mongoose");

const app = express();
// middle ware
app.use(express.json());
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "apidb",
  })
  .then((c) => console.log("Database is connected "))
  .catch((e) => console.log(e));

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("user", schema);

app.get("/", (req, res) => {
  res.send("working ");
});

app.get("/user/all", async (req, res) => {
  const users = await User.find({});

  res.json({ success: true, users });
});

app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({
    name,
    password,
    email,
  });
  res.status(201).cookie("token", "cookie").json({
    success: true,
    message: "resgistered successfully ",
  });
});
// -> dynmaic route always at the end
app.get("/userid/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  // similar to use params
  // console.log(req.params);

  res.json({
    success: true,
    user,
  });
});

app.listen(5000, () => {
  console.log("server is working");
});
