import mongoose from 'mongoose'
const { Schema, model } = mongoose

const assignmentSchema = new Schema({
  assignmentDesc: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: Boolean,
    default: false
  }
})

const assignmentModel = model('Assignment', assignmentSchema)
export default assignmentModel
