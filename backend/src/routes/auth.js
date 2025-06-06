import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'
const router = express.Router()
dotenv.config()

router.post('/signup', async (req, res) => {
    const { email, password } = req.body

    try {
        const isExistingUser = await User.findOne({ email })

        if (isExistingUser) {
            return res.status(400).send('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ email, password: hashedPassword })
        await newUser.save()

        res.status(201).send('User successfully registered')
    } catch (error) {
        res.status(500).send('Server error: ' + error.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        const isExistingUser = await User.findOne({ email })

        if (!isExistingUser) {
            return res.status(404).json({ message: 'User does not exist. Please create an account' })
        }

        const isPasswordMatch = await bcrypt.compare(password, isExistingUser.password)

        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Incorrect password' })
        }

        const userId = isExistingUser._id
        const userEmail = isExistingUser.email
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
        const ACCESS_TOKEN = jwt.sign(
            {
                id: userId,
                email: userEmail
            },
            ACCESS_TOKEN_SECRET,
            { expiresIn: '3h' }
        )
        res.status(200).json({ message: 'Successfully signed in', token: ACCESS_TOKEN })
    } catch (error) {
        res.status(500).send('Server error: ' + error.message)
    }
})

export default router
