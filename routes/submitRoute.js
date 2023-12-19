const express = require("express");
const { submitTest } = require("../controllers/submitController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, submitTest);
module.exports = router;
