import User from '../../schema/userSchema.js'
import bcrypt from 'bcrypt'
import genToken from '../../jwt/genToken.js'
import { sendMail } from '../../utils/sendMail.js'

export const loginUser = async (req, res) => {
    const { email, password } = req.body

    // Prepare email to notify user of login
    const mail = {
        mailFrom: process.env.EMAIL_USER,
        mailTo: email,
        subject: 'Login Successful',
        body: `Hi. You just logged into your account. If this wasn't you, please reply to this email.`
    }

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password Required" });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "This user does not exist. Please Register to continue" });
        }

        // Check if the user has verified their OTP
        if (!user.isVerified) {
            return res.status(400).json({ message: "Please Verify OTP before login" });
        }

        // Compare provided password with stored hashed password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid login credentials" })
        }

        // Optional: save user (currently no changes, so this line can be removed)
        await user.save();

        // Send login notification email
        await sendMail(mail);

        // Generate JWT token
        const token = genToken({ userId: user._id })

        // Set token as HTTP-only cookie and return success response
        return res
            .cookie('token', token, { httpOnly: true, sameSite: 'strict', secure: false, path: '/' })
            .status(200)
            .json({ message: "Login Successful" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
