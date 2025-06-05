const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userType: String,
  resetPasswordOtp: String,
  resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", userSchema);
