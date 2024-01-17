const express = require("express");
const userRouter = express.Router();
const { register, login, checkUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/checkuser", authMiddleware, checkUser);
module.exports = userRouter;
