const mongoose = require("mongoose");
const reminderModel = require("./schemas/reminder");
require("dotenv").config();

async function connectDB() {
  await mongoose.connect(process.env.DB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "event-reminder",
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("connection is open now"));
}

async function getReminders() {
  try {
    const reminders = await reminderModel.find({});
    return reminders;
  } catch (error) {
    throw error;
  }
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
