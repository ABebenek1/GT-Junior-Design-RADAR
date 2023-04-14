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

const postEntry = async (obj) => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital").collection("prelim_data");
    await collection.insertMany(obj);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

const getEntry = async () => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital").collection("prelim_data");
    // collection.find() group query
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

// now exporting objects with key getUserInfo (str) and value the val of getUserInfo (fxn)
module.exports = { postUser, authenticateUser, postEntry };
