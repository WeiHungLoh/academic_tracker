const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI_LOCALHOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
//H21xR97SeZq9T7fl
    console.log(`Mongo DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
}

module.exports = connectDB
