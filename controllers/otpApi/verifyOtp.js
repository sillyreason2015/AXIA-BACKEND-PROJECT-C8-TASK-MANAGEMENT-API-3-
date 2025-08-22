// Import the User model
import User from '../../schema/userSchema.js'

//verify otp function
export const verifyOtp = async (req, res) => {
    const { otp, email } = req.body

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            // User not found
            return res.status(400).json({ message: 'User not found. Please register first!' });
        }

        // Check if the user is already verified
        if (user.isVerified === true) {
            return res.status(400).json({ message: "User is already verified" });
        }

        // Validate OTP (exact match)
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Incorrect OTP. Please enter OTP again" });
        }

        // Check if the OTP has expired
        if (new Date(user.otpExpires) < new Date()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // Mark the user as verified and clear OTP fields
        user.otp = undefined
        user.otpExpires = undefined
        user.isVerified = true

        await user.save()

        // Return success response
        return res.status(200).json({ message: 'Verified successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
