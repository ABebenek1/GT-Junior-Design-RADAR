// parse csv file into a JSON object with fast-csv lib
// and then use the driver to import /insert object into mongodb
// https://www.npmjs.com/package/mongodb
// To run: node parse_csv.js prelim_data_no_PHI.csv
// which selects file "prelim_data_no_PHI.csv"

const fs = require("fs");
const csv = require("@fast-csv/parse");
const { postEntry } = require("./database");

const data = [];
const db = "EmoryHospital2";
const collection = "Data";

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
    firstname: row["firstname"],
    lastname: row["lastname"],
    proc_id: row["proc_id"],
    exam_date: new Date(row["exam_date"]),
    feedback_provided: row["feedback_provided"],
    feedback_score: row["feedback_score"],
  };
};

postEntry(db, collection, data);
