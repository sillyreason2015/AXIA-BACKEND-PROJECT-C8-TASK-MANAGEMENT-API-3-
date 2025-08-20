import Task from '../../schema/taskSchema.js'

export const updateTask = async (req, res) => {
    const userId = req.user._id
    const { id } = req.params
    const { title, description, priority, category, deadline, isCompleted } = req.body

    try {
        if (deadline && new Date(deadline) < new Date()) {
            return res.status(400).json({ message: "Deadline cannot be in the past" })
        }

        const task = await Task.findById(id)
        if (!task) return res.status(404).json({ message: "Task not found" })

        if (task.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to carry out this action" })
        }

        const updates = { title, description, priority, category, deadline, isCompleted }
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        )

        res.status(200).json({message: "Task updated Successfully"}, updatedTask)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
