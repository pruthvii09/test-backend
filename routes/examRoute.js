const express = require("express");
const {
  createExam,
  liveExam,
  getAllExams,
} = require("../controllers/examController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.post("/", auth, admin, createExam);
router.get("/", getAllExams);
router.patch("/:examId", auth, admin, liveExam);

module.exports = router;
