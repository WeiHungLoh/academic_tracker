const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "academic_tracker",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Mongo DB connected: ${conn.connection.host}`);
    console.log(`Database connected: ${conn.connection.db.databaseName}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
  }
}

module.exports = connectDB
