import mongoose from 'mongoose'
import User from './userSchema.js'

const Schema = mongoose.Schema

const taskSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String, 
        required: true,
        enum: ["Low", "Medium", "High"]
    },
    category: {

    }
}, {timestamps: true})