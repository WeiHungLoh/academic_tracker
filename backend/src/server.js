// Represents an entry point to mount backend components like models and routes
import assignmentRoutes from './routes/assignment.js'
import authRoutes from './routes/auth.js'
import connectDB from './db.js'
import cookieJWTAuth from './middleware/cookieJWTAuth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import examRoutes from './routes/exam.js'
import express from 'express'
import pingRoute from './routes/ping.js'

const startServer = async () => {
    await connectDB()
    const app = express()
    const allowedOrigins = [
        'https://academictracker-whloh.netlify.app',
        'http://localhost:3000'
    ]
    app.use(cors({
        // Taken from: https://article.arunangshudas.com/7-tips-for-managing-cors-in-your-backend-applications-a4341385110c
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true)
            } else {
                callback(null, false)
            }
        },
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
