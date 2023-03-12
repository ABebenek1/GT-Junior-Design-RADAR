const {MongoClient} = require('mongodb');

async function main() {
    const uri = "mongodb+srv://abebenek:mbFRw2gSG-Q6kb2@cluster0.ahumge0.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();

        /* This user has already been created, but I'm leaving them as an example
        await createUser(client, 
             {
                 email: "test.admin3@emory.edu",
                 Username: "TestAdmin3",
                 Password: "[encrypted password here]",
                 FirstName: "Test",
                 LastName: "Admin3"
             }, "Administrator");
        */
        
        
        await findResidentsByName(client, "Test Resident1")

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error)

async function createUser(client, newUser, userType){
    const result = await client.db("RADAR_Project").collection(userType + "s").insertOne(newUser);
    console.log(`New listing created with the following id: ${result.insertedID}`);
}

async function findResidentsByName(client, nameOfResident) {
    firstLast = nameOfResident.split(" ")
    firstName = firstLast[0]
    lastName = firstLast[1]
    
    const results  = await client.db("RADAR_Project").collection("Residents").find({FirstName: firstName, LastName: lastName});
    const resultsArray = await results.toArray()

    if (resultsArray.length > 0) {
        console.log(`Found resident(s) with the name '${nameOfResident}':`);
        console.log(resultsArray)
    } else {
        console.log(`No residents found with the name '${nameOfResident}'`);
    }
}
