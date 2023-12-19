const express = require("express");
const {
  addQuestions,
  getQuestionsByExamId,
  deleteQuestion,
} = require("../controllers/questionController");

const router = express.Router();

router.post("/", addQuestions);
router.get("/:examId", getQuestionsByExamId);
router.delete("/:questionId", deleteQuestion);
module.exports = router;
