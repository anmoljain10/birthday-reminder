const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
  },
  { collection: "users" }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
