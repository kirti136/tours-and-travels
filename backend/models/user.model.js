const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    photo: { type: String },
    role: { type: String, default: "user" },
  },
  { timestamps: true },
  { versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
