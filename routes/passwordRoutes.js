import router from 'express'
import { requestPassword } from '../controllers/passwordApi/passwordBarrel.js' // Controller to request password reset
import { resetPassword } from '../controllers/passwordApi/passwordBarrel.js' // Controller to reset password
import authMiddleware from '../middleware/authMiddleware.js' // Middleware to verify user authentication

const passwordRouter = router() // Create a new router instance

// Route for requesting a password reset 
passwordRouter.post('/request', authMiddleware, requestPassword)

// Route for resetting the password 
passwordRouter.post('/reset', authMiddleware, resetPassword)

export default passwordRouter 
