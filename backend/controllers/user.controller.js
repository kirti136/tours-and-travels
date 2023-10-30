const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, dateOfBirth } =
      req.body;

    // Check if a user with the same username or email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({
            message:
              "Username with this name is already taken. Please use another username.",
          });
      } else if (existingUser.email === email) {
        return res
          .status(400)
          .json({
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
};

const login = async (req, res) => {
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
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, "profilePicture-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedFileTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb("Error: Images only! (JPEG and PNG)");
    }
  },
}).single("profilePicture");

const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    upload(req, res, async (err) => {
      if (err) {
        console.error("Error in uploadProfilePicture:", err);
        res.status(400).json({ message: err });
      } else if (!req.file) {
        res.status(400).json({ message: "No file uploaded." });
      } else {
        const filePath = req.file.path;
        user.profilePicture = filePath;
        await user.save();
        res
          .status(200)
          .json({ message: "Profile picture uploaded successfully" });
      }
    });
  } catch (error) {
    console.error("Error in uploadProfilePicture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { register, login, uploadProfilePicture };
