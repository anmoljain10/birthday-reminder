const cron = require("node-cron");
const express = require("express");
const mailService = require("./src/mail");
const app = express();

cron.schedule("0 0 * * *", function () {
  console.log("running a task every day");
  mailService.mailService();
});

app.listen(3000, () => {
  console.log("application listening.....");
});
