// Represents an entry point to mount backend components like models and routes
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db");
// const verifyToken = require("./authMiddleware");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
// app.use(verifyToken);

// Routes below are protected
// app.use("/exam", require("./routes/exam"));
// app.use("/assignment", require("./routes/assignment"));

app.listen(5005);