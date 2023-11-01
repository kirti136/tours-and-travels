const { Router } = require("express");
const {
  validateRegistrationCredentials,
} = require("../middlewares/validateRegistrationCredentials");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = Router();

userRouter.post(
  "/register",
  validateRegistrationCredentials,
  async (req, res) => {
    try {
      const { username, email, password, firstName, lastName, dateOfBirth } =
        req.body;

      // Check if a user with the same username or email already exists
      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        if (existingUser.username === username) {
          return res.status(400).json({
            message:
              "Username with this name is already taken. Please use another username.",
          });
        } else if (existingUser.email === email) {
          return res.status(400).json({
            message: "You are already a registered user. Please login.",
          });
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
        dateOfBirth,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
      console.error("Error in register:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User Login", token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  userRouter,
};
