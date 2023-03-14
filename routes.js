const express = require("express");
const dbCalls = require("./db/main");
const app = express();

app.get("/", async (req, res) => {
  let reminders = [];
  try {
    reminders = await dbCalls.getReminders();
  } catch (e) {}
  res.render("main", {
    layout: "index",
    reminders: reminders,
    minDate: new Date().toISOString().split("T")[0], // minimum date that can be selected
  });
});

app.post("/save-reminder", async (req, res) => {
  try {
    const reminder = await dbCalls.saveReminder(req.body);
    res
      .status(200)
      .render("thank-you", { layout: "index", data: reminder, saved: true });
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

app.post("/delete-reminder", async (req, res) => {
  const reminderId = req.body.id;
  try {
    await dbCalls.deleteReminder(reminderId);
    res
      .status(200)
      .render("thank-you", { layout: "index", id: reminderId, deleted: true });
  } catch (e) {
    console.log(e, "error");
    res.status(500).send(e);
  }
});

app.get("/signup", (req, res) => {
  res.render("signup", { layout: "index" });
});

app.post("/register", async (req, res) => {
  try {
    await dbCalls.createUser(req.body);
    res.redirect("/");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = app;
