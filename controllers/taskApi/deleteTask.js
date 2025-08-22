import Task from '../../schema/taskSchema.js' 

export const deleteTask = async (req, res) => {
    const userId = req.user._id;               
    const { id } = req.params;                 

    try {
        // Find the task by its ID
        const task = await Task.findById(id);
        if (!task) {
            // If task does not exist, return 404
            return res.status(404).json({ message: "This task does not exist" });
        }

        // Ensure the logged-in user is the owner of the task
        if (task.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to carry out this action" });
        }

        // Delete the task
        await Task.findByIdAndDelete(id);

        // Return success response
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
