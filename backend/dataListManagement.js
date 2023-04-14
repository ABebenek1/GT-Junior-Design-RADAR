var mongoConnect = require('./userDB_connect.js');

//import "./userDB_connect.js"

async function main() {
    try {
        /*
        var resident1Info = await mongoConnect.getResidentInfo(mongoConnect.client, "TestResident1");
        console.log(resident1Info);
        console.log("changing")
        await updateResData(mongoConnect.client, "TestResident1", {PROC_ID: "US", EXAM_FINAL_DATE: "2020-02-15", FEEDBACK: "RPR1", feedback_provided: "Yes"});
        var newData = await getResData(mongoConnect.client, "TestResident1");
        console.log("New data: " + JSON.stringify(newData));
        */
    } catch(e) {
        console.log(e);
    } finally {
        await mongoConnect.client.close();
    }
}

async function getResData(client, username) {
    var resInfo = await mongoConnect.getResidentInfo(client, username);
    return resInfo.Data;
}

async function updateResData(client, username, newData) {
    resInfo = await mongoConnect.getResidentInfo(client, username);
    const data = resInfo.Data;
    data[Object.keys(data).length.toString()] = newData;
    await mongoConnect.updateResidentInfo(client, username, {Data: data});
}

main().catch(console.error);
module.exports = {
    getResData,
    updateResData
}