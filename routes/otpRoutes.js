import router from 'express'

import { resendOtp } from '../controllers/otpApi/otpBarrel.js'
import { verifyOtp } from '../controllers/otpApi/otpBarrel.js'
import authMiddleware from '../middleware/authMiddleware.js'


const otpRouter = router()

otpRouter
.post('/resend',authMiddleware, resendOtp)
.post('/verify',authMiddleware, verifyOtp)


export default otpRouter

