const { MongoClient } = require("mongodb");
require("dotenv").config();

async function connectDB() {
  const uri = process.env.DB_CONNECT_URL;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client;
}

async function getReminders(client) {
  const reminderCollection = await client
    .db(process.env.DB_NAME)
    .collection(process.env.DB_COLLECTION);
  const reminders = await reminderCollection.find().stream();

  console.log(reminders);
}

module.exports = connectDB;
