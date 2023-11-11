var express = require("express");
var router = express.Router();
const userModal = require("./users");
router.get("/", function (req, res) {
  res.render("index");
});

// router.get("/create", async function (req, res) {
//   const createduser = await userModal.create({
//     username: "nadeem_99",
//     age: 91,
//     name: "nadeem",
//   });
//   res.send(createduser);
// });
router.get("/find", async function (req, res) {
  let alluser = await userModal.find();
  res.send(alluser);
});
router.get("/delete", async function (req, res) {
  let deleteduser = await userModal.findOneAndDelete({ username: "nadeem_99" });
  res.send(deleteduser);
});
module.exports = router;
