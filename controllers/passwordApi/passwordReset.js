import User from "../../schema/userSchema.js"
import bcrypt from 'bcrypt'


//reset password function
export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body

    try {
        // Find a user with the given token that has not expired
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() } // token is still valid
        });

        if (!user) {
            // Token is invalid or expired
            return res.status(400).json({ message: "Password reset token is invalid or expired" });
        }

        // Hash the new password before saving
        user.password = bcrypt.hashSync(newPassword, 10);

        // Clear reset token and expiration after use
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save()

        return res.status(200).json({ message: "Password reset successfully! Please proceed to login" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
