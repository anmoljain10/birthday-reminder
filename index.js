const cron = require("node-cron");
const express = require("express");
const mailService = require("./src/mail");
const handlebars = require("express-handlebars");
const connectDB = require("./db/main");
const Router = require("./routes");

const app = express();

cron.schedule("0 0 * * *", function () {
  console.log("running a task every day");
  mailService.mailService();
});

// Register `hbs.engine` with the Express app.

app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    //new configuration parameter
    extname: "hbs",
  })
);
app.set("view engine", "hbs");
app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.use(Router);

app.listen(3000, () => {
  // connectDB();
  console.log("application listening.....");
});
