const express = require("express");
const database = require("./database");
const app = express();
const port = 8000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/user", function (req, res) {
  res.send(database("apple"));
});
