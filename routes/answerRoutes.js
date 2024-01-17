const express = require("express");
const answerRouter = express.Router();

const { getAnswers, createAnswer } = require("../controllers/answerController");
const authMiddleware = require("../middleware/authMiddleware");
answerRouter.get("/:questionid", authMiddleware, getAnswers);
answerRouter.post("/:questionid/create", authMiddleware, createAnswer);

module.exports = answerRouter;
