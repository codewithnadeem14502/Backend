// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

// require mongoose
const mongoose = require("mongoose");
// connect data base
mongoose.connect("mongodb://127.0.0.1:27017/praticeDB");
// schema creation
const userschema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
});
//
module.exports = mongoose.model("user", userschema);
