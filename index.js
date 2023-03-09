const cron = require("node-cron");
const express = require("express");
const mailService = require("./src/mail");
const app = express();

console.log(process.env, "mail service");

cron.schedule("*/10 * * * *", function () {
  console.log("---------------------");
  console.log("running a task every 10 minute");
  mailService.mailService();
});

app.listen(3000, () => {
  console.log("application listening.....");
});
