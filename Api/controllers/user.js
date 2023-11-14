import { User } from "../models/user.js";

export const getAllUser = async (req, res) => {
  const users = await User.find({});

  res.json({ success: true, users });
};

export const newUser = async (req, res) => {
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
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  // similar to use params
  // console.log(req.params);

  res.json({
    success: true,
    user,
  });
};
