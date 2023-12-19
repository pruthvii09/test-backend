const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionModel = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam", // Reference to the Exam model
      required: true,
    },
    options: [{ type: String, required: true }],
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionModel);
