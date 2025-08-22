import User from '../../schema/userSchema.js'
import { sendMail } from '../../utils/sendMail.js'

//resend otp function
export const resendOtp = async (req, res) => {
    const { email } = req.body

    try {
        const user = await User.findOne({ email });  
        if (!user) {
            return res.status(400).json({ message: "User not found please register to continue" });
        }

        // If user is already verified, OTP is unnecessary
        if (user.isVerified === true) {
            return res.status(400).json({ message: "OTP is already verified" });
        }

        // Rate limit OTP requests to once every 2 minutes
        if (user.lastOtpSentAt && Date.now() - user.lastOtpSentAt.getTime() < 2 * 60 * 1000) {
            return res.status(429).json({ message: "Please try again after 2 minutes" });
        }

        // Check if current OTP has expired
        if (new Date(user.otpExpires) < new Date()) {
            const newOtp = Math.floor(10000 + Math.random() * 900000);  // Generate 6-digit OTP
            const otpExpires = new Date(Date.now() + 5 * 60 * 1000);    // Set 5-minute expiry

            // Update user with new OTP and timestamps
            user.otp = newOtp;
            user.otpExpires = otpExpires;
            user.lastOtpSentAt = new Date();
            await user.save();

            // Prepare and send email with new OTP
            const mail = {
                mailFrom: process.env.EMAIL_USER,
                mailTo: email,
                subject: 'Your OTP Code',
                body: `Hi ${user.username}, your OTP expired. Here is a new one: ${newOtp}. It expires in 5 minutes.`
            };
    
            await sendMail(mail);

            // Notify user that a new OTP has been sent
            return res.status(400).json({ message: 'OTP expired. A new OTP has been sent to your email address' });
        } else {
            // Current OTP is still valid
            return res.status(400).json({ message: "Your current OTP is still valid" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
