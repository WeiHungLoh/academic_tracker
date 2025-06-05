// Represents an entry point to mount backend components like models and routes
const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const verifyToken = require('./middleware/verifyToken')
const authRoutes = require('./routes/auth')
const examRoutes = require('./routes/exam')
const assignmentRoutes = require('./routes/assignment')

const startServer = async () => {
    await connectDB()
    const app = express()
    app.use(cors())
    app.use(express.json())

    app.use('/auth', authRoutes)
    app.use(verifyToken)

    // Routes below are protected
    app.use('/exam', examRoutes)
    app.use('/assignment', assignmentRoutes)

    const PORT = process.env.PORT || 5005
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

startServer()
