import express from 'express'         // Import Express framework
import dotenv from 'dotenv'           // Import dotenv for environment variables
import cookieParser from 'cookie-parser' // Import cookie-parser to read cookies
import cors from 'cors'               // Import CORS for handling cross-origin requests
import connectDb from './database/database.js' // Import MongoDB connection function
import userRouter from './routes/userRoutes.js' // Import user routes
import passwordRouter from './routes/passwordRoutes.js' // Import password routes
import otpRouter from './routes/otpRoutes.js' // Import OTP routes
import authRouter from './routes/authRoutes.js' // Import authentication routes
import taskRouter from './routes/taskRoutes.js' // Import task routes

const app = express() // Initialize Express app

connectDb() // Connect to MongoDB

// Middleware
app.use(express.json()) // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser()) 
app.use(cors()) 

dotenv.config() // Load environment variables from .env file
const port = process.env.PORT 

// Routes
app.use('/api', userRouter) // Routes for user management
app.use('/api/password', passwordRouter) // Routes for password management
app.use('/api/otp', otpRouter) // Routes for OTP management
app.use('/api', authRouter) // Routes for authentication
app.use('/api/task', taskRouter) // Routes for task management

// Start server
app.listen(port, () => {
    console.log(`Our app is up and running on ${port}`)
})
