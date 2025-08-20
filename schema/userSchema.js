import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    isAdmin: {
    type: Boolean, 
    default: false
   },
isVerified: {type: String, default: false},
otp: String,
otpExpires: Date,
lastOtpSentAt: Date,
passwordResetToken: String,
passwordResetExpires: Date
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User