const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const database = require("./database");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;

const secretKey = fs.readFileSync(path.resolve(__dirname, "./jwtRS256.key"));

const publicKey = fs.readFileSync(
  path.resolve(__dirname, "./jwtRS256.key.pub")
);

app.use(cors());

app.listen(port, function () {
  console.log(`app listening on port ${port}!`);
});

app.use(bodyParser.json());
app.use(cookieParser());

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
    console.log("server received!!!");
    try {
      await database.postUser(req.body);
      res.status(200).send("success");
    } catch (err) {
      console.error(err);
      res.status(400).send(err.message);
    }
  }
});

// DO NOT DELETE - original sign-in -> signin
app.post("/signin", async function (req, res) {
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

// DO NOT DELETE - signin to EmoryHospital2
app.post("/sign-in", async function (req, res) {
  console.log(req.body);
  if (req.body.username === null || req.body.password === null) {
    res.status(400).send("one of the required fields is empty");
  } else {
    try {
      await database.authenticateUser2(req.body.username, req.body.password);
      // save token in a cookie
      //https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
      const token = jwt.sign({ username: req.body.username }, secretKey, {
        algorithm: "RS256",
      });
      res
        .cookie("token", token, { httpOnly: true })
        .status(200)
        .json({ token: token });
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

//
const checkUserAuth = (req, res, next) => {
  console.log(req.cookies);
  req.username = "hardcoded";
  next();
};

// create an endpoint that queries user data
app.get("/user-data", checkUserAuth, (req, res) => {});
