const express = require("express");
const square = require("./square");
const database = require("./database");
const app = express();
const port = 8000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

// app.get("/", function (req, res) {
//   res.send(`The area of a square with a width of 4 is ${square.area(4)}~`);
// });

app.get("/user", function (req, res) {
  res.send(database("apple"));
});

// // Here we require() the name of the file without the (optional) .js file extension
// console.log(`something something`);
// setTimeout(function () {
//   console.log("First");
// }, 3000);
// console.log("Second");
