import router from 'express'

import { resendOtp } from '../controllers/otpApi/otpBarrel.js'
import { verifyOtp } from '../controllers/otpApi/otpBarrel.js'



const otpRouter = router()

otpRouter
.post('/resend',resendOtp)
.post('/verify', verifyOtp)


export default otpRouter

