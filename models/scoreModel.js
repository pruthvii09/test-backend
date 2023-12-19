const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreModel = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam", // Reference to the User model
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Score", scoreModel);
