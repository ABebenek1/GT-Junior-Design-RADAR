const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3301;

app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParer: true, useCreateIndex: true });

const connection = mongoose.connection;

connection.once("open", () => {});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
