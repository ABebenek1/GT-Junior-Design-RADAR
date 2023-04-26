// parse csv file into a JSON object with fast-csv lib
// and then use the driver to import /insert object into mongodb
// https://www.npmjs.com/package/mongodb
// To run: node upload_admin_to_mongo.js ../csv_data_files/admin_data.csv
// which selects file "prelim_data_no_PHI.csv"

const fs = require("fs");
const csv = require("@fast-csv/parse");
const { postEntry } = require("../database");

const data = [];
const db = "EmoryHospital2";
const collection = "Admins";

csv
  .parseFile(process.argv[2], { headers: true })
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    data.push(modifyObj(row));
    // console.log(data);
  })
  .on("end", (rowCount) => console.log(`Parsed ${rowCount} rows`));

const modifyObj = (row) => {
  return {
    username: row["username"],
    password: row["password"],
    email: row["email"],
    // date: new Date(row["EXAM_FINAL_DATE"]),
    firstname: row["firstname"],
    lastname: row["lastname"],
  };
};

postEntry(db, collection, data);
