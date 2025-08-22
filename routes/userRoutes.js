import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js' // Import authentication middleware

// Import user controllers
import { createUser } from '../controllers/userApi/userBarrel.js'
import { viewUser, viewUsers } from '../controllers/userApi/userBarrel.js'
import { updateUser } from '../controllers/userApi/userBarrel.js'
import { deleteUser } from '../controllers/userApi/userBarrel.js'

const userRouter = router() // Create a new router instance

// Route to register/create a new user (public)
userRouter.post('/create', createUser)

// Route to view all users 
userRouter.get('/users', authMiddleware, viewUsers)

// Route to view a specific user by ID 
userRouter.get('/user/:id', authMiddleware, viewUser)

// Route to update a specific user by ID 
userRouter.put('/update/:id', authMiddleware, updateUser)

// Route to delete a specific user by ID 
userRouter.delete('/delete/:id', authMiddleware, deleteUser)

export default userRouter 
