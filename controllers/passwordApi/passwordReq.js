import User from '../../schema/userSchema.js'
import { sendMail } from '../../utils/sendMail.js'
import crypto from 'crypto'

//request new password function
export const requestPassword = async (req, res) => {
    const { email } = req.body

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // User not found
            return res.status(400).json({ message: "User not found. Please register first to continue" });
        }

        // Generate a secure random token
        const token = crypto.randomBytes(32).toString('hex');

        // Set password reset token and expiration 
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 30 * 60 * 1000;

        await user.save(); // Save user with token info

        // Send password reset email
        await sendMail({
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: "Password Reset",
            body: `
                Hello ${user.username}, you recently requested a password reset. 
                <p>Click the link below to reset your password:</p> 
                <a href="http://localhost:4000/password/reset/${token}">Reset Password</a>`
        });

        // Respond with success message
        res.status(200).json({ message: "Password reset request sent successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
