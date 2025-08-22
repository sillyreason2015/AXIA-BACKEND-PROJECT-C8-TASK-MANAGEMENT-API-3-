// Import Task model
import Task from "../../schema/taskSchema.js"; 


// View a single task by ID
export const viewTask = async (req, res) => {
    const {_id} = req.user               // Logged-in user's ID
    const {id} = req.params              // Task ID from request params
    try{
        const task = await Task.findById(id)  // Find task by ID
        if(!task){
            return res.status(404).json({message: "This task does not exist"})
        }
        // Ensure the task belongs to the logged-in user
        if(task.userId.toString() !== _id.toString()){
            return res.status(403).json({message: "You are not authorized to carry out this action"})
        }
        res.status(200).json(task)  // Return the task
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// View all tasks of the logged-in user, sorted by deadline
export const viewAllTasks = async (req, res) => {
    const userId = req.user._id

    try{
        const tasks = await Task.find({userId}).sort({deadline: 1})  // Sort by deadline ascending
        if(!tasks || tasks.length === 0){
            return res.status(404).json({message: "No tasks Found. Create one"})
        }

        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// View all tasks by category for the logged-in user
export const viewTaskByCategory = async (req,res) => {
    const {category} = req.params       // Category to filter
    const userId = req.user._id

    try{
        const tasks = await Task.find({userId, category}).sort({deadline: 1})
        if(!tasks || tasks.length === 0){
            return res.status(404).json({message: `No tasks found in category ${category}`})
        }

        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
