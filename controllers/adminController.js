const nodemailer = require("nodemailer");
const Submission = require("../models/submissionModel");
const Question = require("../models/questionModel");
const Score = require("../models/scoreModel");
const User = require("../models/userModel");
const calculateScoresForExam = async (req, res) => {
  const { examId } = req.params;

  try {
    // Find all submissions for the given exam
    const submissions = await Submission.find({
      exam: examId,
      submitted: true,
    });

    // Fetch the correct answers for the questions in the exam
    const questionIds = submissions.flatMap((submission) =>
      submission.answers.map((answer) => answer.questionId)
    );
    const correctAnswers = await Question.find({ _id: { $in: questionIds } });

    // Iterate through submissions and calculate scores
    const scores = [];
    for (const submission of submissions) {
      let marks = 0;
      submission.answers.forEach((userAnswer) => {
        const correctAnswer = correctAnswers.find((answer) =>
          answer._id.equals(userAnswer.questionId)
        );
        if (correctAnswer && correctAnswer.answer === userAnswer.userAnswer) {
          marks++;
        }
      });
      scores.push({ userId: submission.user, marks });

      // Save the scores to the Score model
      await Score.findOneAndUpdate(
        { userId: submission.user },
        { userId: submission.user, score: marks, examId: examId },
        { upsert: true, new: true }
      );
    }
    res
      .status(200)
      .json({ message: "Scores calculated and saved successfully", scores });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};
const sendScoreEmails = async (req, res) => {
  const { examId } = req.params;
  try {
    // Fetch all scores
    const scores = await Score.find({ examId: examId });

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL, // Replace with your Gmail email
        pass: process.env.PASSWORD, // Replace with your Gmail password
      },
    });

    // Iterate through scores and send emails
    for (const score of scores) {
      // Fetch user information based on userId
      const user = await User.findById(score.userId);

      // Check if the user exists
      if (!user) {
        console.error(`User not found for userId: ${score.userId}`);
        continue;
      }

      // Create HTML content for the email
      const emailContent = `
                  <p>Hello ${user.email},</p>
                  <p>Your exam score is: ${score.score}</p>
                  <p>Thank you for participating!</p>
              `;

      // Send email
      await transporter.sendMail({
        from: "autipruthviraj@gmail.com",
        to: user.email,
        subject: "Exam Score Notification!!",
        html: emailContent,
      });
    }

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};
module.exports = { calculateScoresForExam, sendScoreEmails };
