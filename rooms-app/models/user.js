const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    fullName: String,
    // slack login - optional
    slackID: String,
    // google login - optional
    googleID: String
  }, {
    timestamps: true
  });

  const User = mongoose.model("User", userSchema);

module.exports = User;