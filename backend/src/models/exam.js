import mongoose from 'mongoose'
const { Schema, model } = mongoose

const examSchema = new Schema({
  examDesc: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
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
  },
  notes: {
    type: String,
    default: ''
  }
})

const examModel = model('Exam', examSchema)
export default examModel
