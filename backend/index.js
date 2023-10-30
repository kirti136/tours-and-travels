require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");

const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Voyaze - Tours and Travels" });
});

let PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
