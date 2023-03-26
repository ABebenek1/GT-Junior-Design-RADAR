const { MongoClient, ServerApiVersion } = require("mongodb");
const bcrypt = require("bcrypt");

const uri =
  "mongodb+srv://winniewjeng:apple@cluster0.bpf4vis.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// check if the username is already in the database
const authenticateUser = async () => {};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// post user to the database
const postUser = async ({
  firstName,
  lastName,
  username,
  password,
  isAdmin,
}) => {
  try {
    await client.connect();
    const collection = client.db("EmoryHospital").collection("users_data");
    // hash the password
    const hashedPassword = hashPassword(password);
    collection.insertOne({
      username,
      password: hashedPassword,
      isAdmin,
      firstName,
      lastName,
    });
  } catch (err) {
  } finally {
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
module.exports = { postUser, postEntry };
