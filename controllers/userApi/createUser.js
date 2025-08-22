import User from "../../schema/userSchema.js";
import bcrypt from "bcrypt";
import { sendMail } from "../../utils/sendMail.js";

export const createUser = async (req, res) => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This user already exists" });
        }

        // Generate OTP and expiration
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); 

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
            otp,
            otpExpires,
            isVerified: false
        });

        await newUser.save();

        // Send OTP email
        await sendMail({
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: "New User Registration Successful",
            body: `Hi ${username}, thank you for registering. Your verification code is <b>${otp}</b> and it expires in 5 minutes.`
        });

        return res.status(201).json({
            message: "User created successfully. OTP has been sent to your email."
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
