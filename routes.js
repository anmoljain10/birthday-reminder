const express = require("express");
const reminders = require("./db/main");
const app = express();

app.get("/", (req, res) => {
  res.render("main", { layout: "index" });
});

app.post("/save-reminder", async (req, res) => {
  try {
    const reminder = await reminders.saveReminder(req.body);
    res.status(200).send(reminder);
  } catch (e) {
    res.status(500).send();
  }
});
