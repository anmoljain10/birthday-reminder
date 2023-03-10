const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  reminder: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Reminder = mongoose.model("Reminder", ReminderSchema);

module.exports = Reminder;
