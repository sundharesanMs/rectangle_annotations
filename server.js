require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const mongoDB = "mongodb://127.0.0.1:27017/sundharvecrosProjectdb";

mongoose.connect(mongoDB)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use("/auth", require("./routes/auth"));
app.use("/annotations", require("./routes/annotation"));

app.listen(5000, () => console.log("Backend running on port 5000"));    
