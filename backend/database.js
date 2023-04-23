const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://winniewjeng:apple@cluster0.bpf4vis.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const getUser = async (username) => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital").collection("users_data");
    return await collection.findOne({ username }); // returns null if no entry found
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const authenticateUser = async (username, password) => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital").collection("users_data");
    const user = await collection.findOne({ username });
    if (user == null) throw new Error("User not found");
    // Before
    const db_pw = user.password;
    const match = await bcrypt.compare(password, db_pw);
    if (!match) throw new Error("Password incorrect");
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
};

// DO NOT DELETE - authenticate EmoryHospital2 user at signin
const authenticateUser2 = async (username, password) => {
  try {
    await client.connect();

    const residents_collection = client
      .db("EmoryHospital2")
      .collection("Residents");
    const resident_user = await residents_collection.findOne({ username });

    if (resident_user === null) throw new Error("User not found");

    // Now
    const db_pw = resident_user.password;
    const match = db_pw === password;
    console.log(`db_pw: ${db_pw} password: ${password}`);
    if (!match) throw new Error("Password incorrect");
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
};

const authenticateAdmin = async (username, password) => {
  try {
    await client.connect();

    const admin_collection = client.db("EmoryHospital2").collection("Admins");
    const admin_user = await admin_collection.findOne({ username });

    if (admin_user === null) throw new Error("User not found");

    // Now
    const db_pw = admin_user.password;
    const match = db_pw === password;
    console.log(`db_pw: ${db_pw} password: ${password}`);
    if (!match) throw new Error("Password incorrect");
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await client.close();
  }
};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// post user to the database
const postUser = async ({
  isAdmin,
  firstName,
  lastName,
  username,
  password,
  remember,
}) => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital").collection("users_data");
    // hash the password
    const hashedPassword = await hashPassword(password);
    await collection.insertOne({
      username,
      password: hashedPassword,
      isAdmin,
      firstName,
      lastName,
    });
  } catch (err) {
    console.error(err);
  } finally {
    console.log("inserted user into DB!");
    await client.close();
  }
};

// upload entry from .csv spreadsheet
const postEntry = async (obj) => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital2").collection("Residents");
    await collection.insertMany(obj);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const getUserData = async (username) => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital2").collection("Data");
    const userData = await collection.find({ username }).toArray();
    // .forEach((x) => console.log(x));
    console.log(userData);
    return userData;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const getResidentData = async () => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital2").collection("Residents");
    const residentData = await collection.find({}).toArray();
    
    return residentData;
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};



module.exports = {
  postUser,
  authenticateUser,
  authenticateUser2,
  authenticateAdmin,
  postEntry,
  getUserData,
  getResidentData,
};
