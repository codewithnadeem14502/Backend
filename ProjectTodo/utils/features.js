import jwt from "jsonwebtoken";

export const sendCookies = (user, res, statecode = 201, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECERT);

  res
    .status(statecode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
