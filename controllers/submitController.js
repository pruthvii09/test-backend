const Submission = require("../models/submissionModel");
const Exam = require("../models/examModel");
const submitTest = async (req, res) => {
  const { examId, answers } = req.body;
  const userId = req.user.id;
  try {
    // Check if the exam exists
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    // Check if the user has already submitted the test
    const existingSubmission = await Submission.findOne({
      exam: examId,
      user: userId,
    });
    if (existingSubmission && existingSubmission.submitted) {
      return res.status(400).json({ error: "Test already submitted" });
    }

    // Create or update the submission
    if (existingSubmission) {
      existingSubmission.answers = answers;
      existingSubmission.submitted = true;
      await existingSubmission.save();
      res
        .status(200)
        .json({ message: "Test successfully updated and submitted" });
    } else {
      const newSubmission = new Submission({
        exam: examId,
        user: userId,
        answers,
        submitted: true,
      });
      await newSubmission.save();
      res.status(201).json({ message: "Test successfully submitted" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};

module.exports = { submitTest };
