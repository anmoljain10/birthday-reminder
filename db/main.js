const mongoose = require("mongoose");
const reminderModel = require("./schemas/reminder");
require("dotenv").config();

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

async function connectDB() {
  await mongoose.connect(process.env.DB_CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("connection is open now"));
}

async function getReminders() {
  try {
    const reminders = await reminderModel.find({});
    let updatedReminders = reminders.map((reminder) => {
      let fullDate = new Date(reminder.date);
      let date = fullDate.getDate();
      let month = fullDate.getMonth();
      let year = fullDate.getFullYear();
      return {
        reminder: reminder.reminder,
        description: reminder.description,
        date: reminder.date,
        displayDate: `${monthNames[month]} ${date}, ${year}`,
      };
    });
    console.log(updatedReminders);
    return updatedReminders;
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
