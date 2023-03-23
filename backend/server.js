const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database");
const app = express();
const port = 8000;

app.use(cors());

app.listen(port, function () {
  console.log(`app listening on port ${port}!`);
});

// app.get("/user/:username", function (req, res) {
//   // req is an object and params is an object and username is a string
//   // req['params']['username']; which is the same thing as:
//   const username = req.params.username;

//   // database is an object. 'getUserInfo' is the key that returns value getUserInfo fxn w/ param username
//   // res.send(database["getUserInfo"](username)); which is the same thing as:
//   res.send(database.getUserInfo(username));
// });

app.use(bodyParser.json());
app.post("/sign-up", async function (req, res) {
  console.log(req.body);
  if (
    req.body.firstName == null ||
    req.body.lastName == null ||
    req.body.isAdmin == null ||
    req.body.username == null ||
    req.body.password == null
  ) {
    res.status(400).send("one of the required fields is empty");
  } else {
    try {
      await database.postUser(req.body);
      res.status(200).send("success");
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  }
});
