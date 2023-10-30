const { Router } = require("express");
const {
  register,
  login,
  uploadProfilePicture,
} = require("../controllers/user.controller");

const {
  validateRegistrationCredentials,
} = require("../middlewares/validateRegistrationCredentials");

const userRouter = Router();

userRouter.post("/register", validateRegistrationCredentials, register);
userRouter.post("/login", login);
userRouter.post("/uploadProfilePicture", uploadProfilePicture);

module.exports = {
  userRouter,
};
