// parse csv file into a JSON object with fast-csv lib
// and then use the driver to import /insert object into mongodb
// https://www.npmjs.com/package/mongodb
// To run: node parse_csv.js prelim_data_no_PHI.csv
// which selects file "prelim_data_no_PHI.csv"

const fs = require("fs");
const csv = require("@fast-csv/parse");
const { postResidentEntry } = require("./database");

const data = [];
const db = "EmoryHospital2";
const collection = "Residents";

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
    firstname: row["firstname"],
    lastname: row["lastname"],
    username: row["username"],
    password: row["password"],
    email: row["email"],
    year: row["year"],
    data: row["data"],
    comments: row["comments"],
    in_data: row["in_data"],
  };
};

postEntry(db, collection, data);
