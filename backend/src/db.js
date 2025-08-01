import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'academic_tracker'
    })

    console.log(`Mongo DB connected: ${conn.connection.host}`)
    console.log(`Database connected: ${conn.connection.db.databaseName}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit()
  }
}

export default connectDB
