import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../utils/features.js";
import ErrorHandler from "../middleware/Error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invaild Email or Password", 404));
    // if (!user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "User Don't Exist",
    //   });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return next(new ErrorHandler("Invaild Email or Password", 404));
    // if (!isMatch)
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invaild Email or Password",
    //   });

    sendCookies(user, res, 200, `Weclome back ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("user already exist", 404));
    // if (user)
    //   return res.status(404).json({
    //     success: false,
    //     message: "user already exist",
    //   });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    sendCookies(user, res, 201, "Resgistered Successfullllllly");
  } catch (error) {
    next(error);
  }
};

export const getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};
