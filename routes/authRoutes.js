import router from 'express'

import { loginUser } from '../controllers/authApi/authBarrel.js'
import { logoutUser } from '../controllers/authApi/authBarrel.js'
import authMiddleware from '../middleware/authMiddleware.js'


const authRouter = router()

authRouter
.post('/login',loginUser)
.post('/logout',authMiddleware,logoutUser)

export default authRouter