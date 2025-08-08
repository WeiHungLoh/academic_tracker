import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const userModel = model('User', userSchema)
export default userModel
