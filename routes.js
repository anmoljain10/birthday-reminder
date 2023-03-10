const express = require("express");
const dbCalls = require("./db/main");
const app = express();

app.get("/", async (req, res) => {
  let reminders = [];
  try {
    reminders = await dbCalls.getReminders();
  } catch (e) {}
  res.render("main", { layout: "index", reminders: reminders });
});

app.post("/save-reminder", async (req, res) => {
  try {
    const reminder = await dbCalls.saveReminder(req.body);
    res.status(200).render("thank-you", { layout: "index", data: reminder });
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/reminders", async (req, res) => {
  try {
    const reminders = await dbCalls.getReminders();
    res.status(200).send(reminders);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = app;
