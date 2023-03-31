const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8000;

const secretKey = fs.readFileSync(path.resolve(__dirname, "./jwtRS256.key"));

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

app.post("/sign-in", async function (req, res) {
  console.log(req.body);
  if (req.body.username == null || req.body.password == null) {
    res.status(400).send("one of the required fields is empty");
  } else {
    try {
      await database.authenticateUser(req.body.username, req.body.password);

      // save token in a cookie
      //https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
      const token = jwt.sign({ username: req.body.username }, secretKey, {
        algorithm: "RS256",
      });
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .send("success");
    } catch (err) {
      console.error(err);
      if (err.message === "Password incorrect") {
        res.status(401).send(err.message);
      } else {
        res.status(400).send(err.message);
      }
    }
  }
});
