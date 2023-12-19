const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    required: true,
    default: "user",
  },
});

module.exports = mongoose.model("User", userModel);
