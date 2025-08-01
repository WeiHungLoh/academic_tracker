import Assignment from '../models/assignment.js'
import express from 'express'
const router = express.Router()

router.post('/add', async (req, res) => {
    const { assignmentDesc, dueDate } = req.body
    // Retrieves userId that has been created at sign in and verified
    const userId = req.user.id
    try {
        const newAssignment = new Assignment({ assignmentDesc, dueDate, userId })
        await newAssignment.save()
        res.status(201).send('Successfully added an assignment!')
    } catch (error) {
        res.status(500).send('Failed to add a task ' + error.message)
    }
})

router.get('/view', async (req, res) => {
    const userId = req.user.id
    try {
        // Finds all assignments for a specific user then sort them in ascending order by dueDate
        const sortedAssignments = await Assignment.find({ userId }).sort({ dueDate: 1 })
        res.status(200).json(sortedAssignments)
    } catch (error) {
        res.status(500).send('Failed to load assignments ' + error.message)
    }
})

router.put('/togglestatus', async (req, res) => {
    const { assignment } = req.body
    const id = assignment._id
    const currStatus = assignment.status
    try {
        const assignment = await Assignment.findByIdAndUpdate(
            id,
            { status: !currStatus },
            { new: true }
        )
        return res.status(200).json({ assignment })
    } catch (error) {
        return res.status(500).send('Error toggling completion status ' + error.message)
    }
})

router.put('/editnotes', async (req, res) => {
    const { assignmentId, notes } = req.body

    try {
        await Assignment.findByIdAndUpdate(
            assignmentId,
            { notes },
            { new: true }
        )
        res.status(200).send('Updated notes')
    } catch (error) {
        res.status(500).send('Error updating notes ' + error.message)
    }
})

router.delete('/deleteall', async (req, res) => {
    const userId = req.user.id

    try {
        await Assignment.deleteMany({ userId: userId })
        res.status(200).send('Deleted all assignments')
    } catch (error) {
        res.status(500).send('Error deleting assignment ' + error.message)
    }
})

router.delete('/:id', async (req, res) => {
    // Since assignment object ID has been passed to param, retrieve it
    const { id } = req.params

    try {
        await Assignment.findByIdAndDelete(id)
        res.status(200).send('Deleted assignment')
    } catch (error) {
        res.status(500).send('Error deleting assignment ' + error.message)
    }
})

export default router
