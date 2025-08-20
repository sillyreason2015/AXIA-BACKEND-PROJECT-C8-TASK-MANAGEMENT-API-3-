import mongoose from "mongoose"

const Schema = mongoose.Schema

const taskSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    category: {
      type: String,
      required: true,
      enum: ["Work", "Personal", "Shopping", "Health", "Finance", "Education", "Other"],
      default: "Other",
    },
    deadline: {
      type: Date,
      required: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)
const Task = mongoose.model('Task', taskSchema)

export default Task