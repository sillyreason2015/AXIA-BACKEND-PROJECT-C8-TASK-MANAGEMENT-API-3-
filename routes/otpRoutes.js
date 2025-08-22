import router from 'express' 
import { resendOtp } from '../controllers/otpApi/otpBarrel.js' // Controller to resend OTP
import { verifyOtp } from '../controllers/otpApi/otpBarrel.js' // Controller to verify OTP

const otpRouter = router() // Create a new router instance

// Route to resend OTP 
otpRouter.post('/resend', resendOtp)

// Route to verify OTP 
otpRouter.post('/verify', verifyOtp)

export default otpRouter 
