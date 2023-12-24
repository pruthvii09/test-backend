const Exam = require("../models/examModel");

const createExam = async (req, res) => {
  const { title, duration } = req.body;
  if ((!title, !duration)) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const exist = await Exam.findOne({ title });
    if (exist) {
      return res.status(409).json({ error: "Exam Name Already Exist!" });
    }
    const exam = await Exam.create({
      title,
      duration,
    });
    res.status(201).json({ exam });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};

const liveExam = async (req, res) => {
  const { examId } = req.params;
  try {
    // Find the exam by its ID
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }
    exam.status = !exam.status;
    await exam.save();

    res.status(200).json({
      message: "Exam status toggled successfully",
      updatedStatus: exam.status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    if (!exams) {
      return res.status(404).json({ error: "Exams Not Found" });
    }
    res.status(201).json({ note: "Given API Works !!! 😀😃😀😃", ...exams });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};
module.exports = { createExam, liveExam, getAllExams };
