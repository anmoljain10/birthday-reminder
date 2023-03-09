const nodemailer = require("nodemailer");
const events = require("./constants/events");

module.exports = {
  mailService: function () {
    let mailTransporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    events.forEach((event) => {
      const eventDate = new Date(event.date).getDate();
      const eventMonth = new Date(event.date).getMonth();
      const eventYear = new Date(event.date).getFullYear();

      const isSameDate =
        eventDate === todayDate &&
        eventMonth === todayMonth &&
        todayYear === eventYear;

      if (isSameDate) {
        let mailDetails = {
          from: process.env.SENDER_EMAIL,
          to: process.env.RECEIVER_EMAIL,
          subject: event.reminder,
          text: event.description,
        };

        mailTransporter.sendMail(mailDetails, function (err, data) {
          if (err) {
            console.log("error occurred", err.message);
          } else {
            console.log("---------------------");
            console.log("email sent successfully");
          }
        });
      }
    });
  },
};
