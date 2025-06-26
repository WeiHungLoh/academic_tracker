// Represents an entry point to mount backend components like models and routes
import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import cookieJWTAuth from './middleware/cookieJWTAuth.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import examRoutes from './routes/exam.js'
import assignmentRoutes from './routes/assignment.js'
import pingRoute from './routes/ping.js'

const startServer = async () => {
    await connectDB()
    const app = express()
    app.use(cors({
        origin: process.env.NODE_ENV === 'production'
            ? 'https://academictracker-whloh.netlify.app' : 'http://localhost:3000',
        credentials: true
    }))
    app.use(express.json())
    app.use(cookieParser())

    app.use('/ping', pingRoute)
    app.use('/auth', authRoutes)

    // Routes below are protected
    app.use('/exam', cookieJWTAuth, examRoutes)
    app.use('/assignment', cookieJWTAuth, assignmentRoutes)

    const PORT = process.env.PORT || 5005
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

startServer()
