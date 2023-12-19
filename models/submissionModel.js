const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const submissionModel = new Schema(
  {
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        userAnswer: String,
      },
    ],
    submitted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Submission", submissionModel);
