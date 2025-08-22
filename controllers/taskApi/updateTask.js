import Task from '../../schema/taskSchema.js'  // Import Task model

//update task function
export const updateTask = async (req, res) => {
    const userId = req.user._id 
    const { id } = req.params                 
    const { title, description, priority, category, deadline, isCompleted } = req.body 

    try {
        // Check if the new deadline is not in the past
        if (deadline && new Date(deadline) < new Date()) {
            return res.status(400).json({ message: "Deadline cannot be in the past" })
        }

        // Find task by ID
        const task = await Task.findById(id)
        if (!task) return res.status(404).json({ message: "Task not found" })

        // Check if the logged-in user owns the task
        if (task.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to carry out this action" })
        }

        // Prepare the updates object
        const updates = { title, description, priority, category, deadline, isCompleted }

        // Update the task and return the updated document
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true } 
        )

        // Respond with success message and updated task
        res.status(200).json({ message: "Task updated Successfully" }, updatedTask)
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}
