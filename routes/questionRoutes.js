const express = require("express");
const questionRouter = express.Router();

const {
  getQuestions,
  createQuestion,
} = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");
questionRouter.get("/", authMiddleware, getQuestions);
questionRouter.post("/create", authMiddleware, createQuestion);

module.exports = questionRouter;
