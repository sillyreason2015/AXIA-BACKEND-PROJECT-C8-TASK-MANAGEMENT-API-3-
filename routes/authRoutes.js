import router from 'express' 
import { loginUser } from '../controllers/authApi/authBarrel.js' // Controller for login
import { logoutUser } from '../controllers/authApi/authBarrel.js' // Controller for logout
import authMiddleware from '../middleware/authMiddleware.js' // Middleware to protect routes

const authRouter = router() // Create a new router instance

// Route for user login 
authRouter.post('/login', loginUser) 

// Route for user logout 
authRouter.post('/logout', authMiddleware, logoutUser) 

export default authRouter 
