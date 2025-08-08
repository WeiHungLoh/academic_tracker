import Exam from '../models/exam.js'
import express from 'express'
const router = express.Router()

router.post('/', async (req, res) => {
    const { examDesc, dueDate, duration } = req.body
    // Retrieves userId that has been created at sign in and verified
    const userId = req.user.id
    try {
        const newExam = new Exam({ examDesc, dueDate, userId, duration })
        await newExam.save()
        res.status(201).send('Successfully added an exam')
    } catch (error) {
        res.status(500).send('Failed to add an exam ' + error.message)
    }
})

router.get('/', async (req, res) => {
    const userId = req.user.id
    try {
        // Finds all assignments for a specific user then sort them in ascending order by dueDate
        const sortedExams = await Exam.find({ userId }).sort({ dueDate: 1 })
        res.status(200).json(sortedExams)
    } catch (error) {
        res.status(500).send('Failed to load exams ' + error.message)
    }
})

router.put('/edit-status/:examId', async (req, res) => {
    const { exam } = req.body
    const { examId } = req.params
    const currStatus = exam.status
    try {
        const exam = await Exam.findByIdAndUpdate(
            examId,
            { status: !currStatus },
            { new: true }
        )
        return res.status(200).json({ exam })
    } catch (error) {
        return res.status(500).send('Error toggling completion status ' + error.message)
    }
})

router.put('/edit-notes/:examId', async (req, res) => {
    const { examId } = req.params
    const { notes } = req.body

    try {
        await Exam.findByIdAndUpdate(
            examId,
            { notes },
            { new: true }
        )
        res.status(200).send('Updated notes')
    } catch (error) {
        res.status(500).send('Error updating notes ' + error.message)
    }
})

router.delete('/', async (req, res) => {
    const userId = req.user.id

    try {
        await Exam.deleteMany({ userId: userId })
        res.status(200).send('Deleted all assignments')
    } catch (error) {
        res.status(500).send('Error deleting assignment ' + error.message)
    }
})

router.delete('/:examId', async (req, res) => {
    // Since assignment object ID has been passed to param, retrieve it
    const { examId } = req.params
    try {
        await Exam.findByIdAndDelete(examId)
        res.status(200).send('Deleted exam')
    } catch (error) {
        res.status(500).send('Error deleting exam ' + error.message)
    }
})

export default router
