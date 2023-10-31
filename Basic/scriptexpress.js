/* 

BASIC OF ROUTES

GET (show-data) -> Data is not important, aka data will show in searching bar
 ex: search value, searching book rich dad poor dad

 POST (hide-data) ->  Data is important, aka data will encrypted
 ex: login -> email and password

 */
const express = require("express");
// express variable has power of expres
const app = express(); // calling express
const port = 3000;

/* MIDDLE-WARE 

request aana ka baat aur route is pehel (middle of the both )

next();-> important, its like push 

n- number of middle ware can be created 

*/
function middleware(req, res, next) {
  console.log("nadeem middle ware is working -1 ");
  next();
}
app.use(middleware);
app.use(function (req, res, next) {
  console.log("nadeem middle ware is working -2 ");
  next();
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/profile", function (req, res) {
  res.send("profile page");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
