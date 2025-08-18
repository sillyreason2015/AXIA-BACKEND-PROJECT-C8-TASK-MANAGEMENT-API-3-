import User from "../../schema/userSchema.js";
import bcrypt, { genSalt } from 'bcrypt'
import { sendMail } from "../../utils/sendMail.js";



export const createUser = async (req, res) => {
    const {name, email, password, username} = req.body
    if (!name || !email || !password || !username){
        return res.status(400).json({message: "Please enter all fields"})
    }
    try{
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "This user already exists"})
        }

    const otp = Math.floor(100000 +Math.random() * 90000)
    const otpExpires = new Date(Date.now() + 1000 * 60 * 5).toISOString()

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(salt, password)


    const newUser = new User({
        ...req.body, 
       password: hashedPassword, 
        otp, 
        otpExpires
    }) 

    await newUser.save()

    const mailObj = {
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: "New User Registration Successful",
            body: `Hi ${displayName}. Thank you for registering with us. Your verification code is ${otp} and it expires in 5 minutes`
        }

        await sendMail(mailObj)

}catch(error){
    res.status(500).json({message: error.message})
}
    }
   