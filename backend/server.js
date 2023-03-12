const express = require("express");
const database = require("./database");
const app = express();
const port = 8000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/user/:username", function (req, res) {
  // req is an object and params is an object and username is a string
  // req['params']['username']; which is the same thing as:
  const username = req.params.username;

  // database is an object. 'getUserInfo' is the key that returns value getUserInfo fxn w/ param username
  // res.send(database["getUserInfo"](username)); which is the same thing as:
  res.send(database.getUserInfo(username));
});
