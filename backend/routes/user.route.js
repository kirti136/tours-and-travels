const { Router } = require("express");
const { register, login, uploadProfilePicture } = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/uploadProfilePicture", uploadProfilePicture);

module.exports = {
  userRouter,
};
