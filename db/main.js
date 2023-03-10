const mongoose = require("mongoose");
const reminderModel = require("./schemas/reminder");
require("dotenv").config();

async function connectDB() {
  const client = mongoose.connect(process.env.DB_CONNECT_URL, {
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

async function saveReminder(reminderData) {
  const reminder = new reminderModel(reminderData);
  try {
    await reminder.save();
    return reminder;
  } catch (error) {
    throw error;
  }
}

module.exports = { connectDB, getReminders, saveReminder };
