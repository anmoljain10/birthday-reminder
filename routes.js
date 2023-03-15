const express = require("express");
const dbCalls = require("./db/main");
const passport = require("passport");
const app = express();
const connectEnsureLogin = require("connect-ensure-login");
const User = require("./db/schemas/user");

app.get("/", connectEnsureLogin.ensureLoggedIn("/signin"), async (req, res) => {
  let reminders = [];
  try {
    reminders = await dbCalls.getReminders(req.user.email);
  } catch (e) {}
  res.render("main", {
    layout: "index",
    reminders: reminders,
    minDate: new Date().toISOString().split("T")[0], // minimum date that can be selected
  });
});

app.post(
  "/save-reminder",
  connectEnsureLogin.ensureLoggedIn("/signin"),
  async (req, res) => {
    try {
      const reminder = await dbCalls.saveReminder({
        ...req.body,
        createdBy: req.user.email,
      });
      res
        .status(200)
        .render("thank-you", { layout: "index", data: reminder, saved: true });
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

app.get("/reminders", async (req, res) => {
  try {
    const reminders = await dbCalls.getReminders(req.user.email);
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

app.get("/signin", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { layout: "index" });
  }
});

app.post("/register", async (req, res) => {
  try {
    await User.register(
      { email: req.body.email, name: req.body.name, _id: req.body.email },
      req.body.password,
      async function (err, user) {
        if (err) {
          console.log(err, "error");
        }
        if (user) {
          console.log(user);
          const response = await User.authenticate()(
            req.body.email,
            req.body.password
          );
          if (reponse.user) {
            res.redirect("/");
          }
        }
      }
    );
  } catch (e) {
    console.log(e, "er");
    res.status(500).send(e);
  }
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/signin" }),
  function (req, res) {
    console.log(req.user, "--logged in user!");
    res.redirect("/");
  }
);

app.post("/logout", (req, res) => {
  req.logout(function (err, data) {
    console.log(err, data);
    res.redirect("/signin");
  });
});

module.exports = app;
