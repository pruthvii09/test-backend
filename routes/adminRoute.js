const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  calculateScoresForExam,
  sendScoreEmails,
} = require("../controllers/adminController");

const router = express.Router();

router.get("/:examId", auth, admin, calculateScoresForExam);
router.get("/send-mail/:examId", auth, admin, sendScoreEmails);
module.exports = router;
