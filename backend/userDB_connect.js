const { MongoClient } = require("mongodb");

const uri = 
  "mongodb+srv://abebenek:mbFRw2gSG-Q6kb2@cluster0.ahumge0.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri)

async function main() {
  try {
    await client.connect();

    /* Examples of each function
        await createUser(client, 
             {
                 email: "test.admin3@emory.edu",
                 Username: "TestAdmin3",
                 Password: "[encrypted password here]",
                 FirstName: "Test",
                 LastName: "Admin3"
             }, "Administrator");
        */
    /*
        await findResidentsByName(client, "Test Resident1");

        await updateResidentInfo(client, "TestResident1", {Year: "R2"});

        await deleteResident(client, "TestResident3");
        await createUser(client, {Username: "TestResident3"}, "Resident");
        await deleteResident(client, "TestResident3");
        */
  } catch (e) {
    console.error(e);
  } finally {
    //await client.close();
  }
}

main().catch(console.error);

async function createUser(client, newUser, userType) {
  const result = await client
    .db("RADAR_Project")
    .collection(userType + "s")
    .insertOne(newUser);
  console.log(
    `New listing created with the following id: ${result.insertedID}`
  );
}

async function findResidentsByName(client, nameOfResident) {
  firstLast = nameOfResident.split(" ");
  firstName = firstLast[0];
  lastName = firstLast[1];
  const results = await client
    .db("RADAR_Project")
    .collection("Residents")
    .find({ FirstName: firstName, LastName: lastName });

  const resultsArray = await results.toArray();

  if (resultsArray.length > 0) {
    console.log(`Found resident(s) with the name '${nameOfResident}':`);
    console.log(resultsArray);
  } else {
    console.log(`No residents found with the name '${nameOfResident}'`);
  }
}

async function updateResidentInfo(client, residentUsername, update) {
  const result = await client
    .db("RADAR_Project")
    .collection("Residents")
    .updateOne({ Username: residentUsername }, { $set: update });

  if (result.matchedCount > 0) {
    console.log("Updated the user information for " + residentUsername);
  } else {
    console.log("Unable to find user " + residentUsername);
  }
}

async function deleteResident(client, residentUsername) {
  const result = await client
    .db("RADAR_Project")
    .collection("Residents")
    .deleteOne({ Username: residentUsername });
  if (result.deletedCount > 0) {
    console.log("Database entry for " + residentUsername + " was deleted");
  } else {
    console.log("Could not find user " + residentUsername);
  }
}

async function getResidentInfo(client, residentUsername) {
  const resident = await client
    .db("RADAR_Project")
    .collection("Residents")
    .findOne({Username: residentUsername});
  if(resident) {
    console.log("Got info for " + resident.FirstName + " " + resident.LastName)
  } else {
    console.log("Could not find user " + resident.FirstName + " " + resident.LastName)
  }
  return resident
}
module.exports = {
  client,
  createUser,
  findResidentsByName,
  updateResidentInfo,
  deleteResident,
  getResidentInfo
};
