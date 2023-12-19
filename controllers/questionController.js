const Question = require("../models/questionModel");
const addQuestions = async (req, res) => {
  const { questions } = req.body;

  try {
    // Check if questions array is provided
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid questions array provided" });
    }

    // Insert all questions in the array
    const insertedQuestions = await Question.insertMany(questions);

    res.status(201).json({
      message: "Questions added successfully",
      questions: insertedQuestions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};

const getQuestionsByExamId = async (req, res) => {
  const { examId } = req.params;
  try {
    const questions = await Question.find({ examId: examId });
    if (!questions) {
      return res.status(404).json({ error: "No Questions Added" });
    }
    res.status(201).json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};
const deleteQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    await Question.findByIdAndDelete(questionId);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message || "An error occurred" });
  }
};
module.exports = { addQuestions, getQuestionsByExamId, deleteQuestion };
