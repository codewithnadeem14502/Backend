import jwt from "jsonwebtoken";

export const sendCookies = (user, res, statecode = 201, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECERT);

  res
    .status(statecode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      // working in deploymnet,
      // but in dev -> we don't get any cookies
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
