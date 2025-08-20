import Task from "../../schema/taskSchema.js";


export const viewTask = async (req, res) => {
    const {_id} = req.user
    const {id} = req.params
    try{
    const task = await Task.findById(id)
    if(!task){
        return res.status(404).json({message: "This task does not exist"})
    }
    if(task.userId.toString() !== _id.toString()){
        return res.status(403).json({message: "You are not authorized to carry out this action"})
    }
    res.status(200).json(task)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const viewAllTasks = async (req, res) => {
    const userId = req.user._id

    try{
        const tasks = await Task.find({userId}).sort({deadline: 1})
        if(!tasks || tasks.length === 0){
            return res.status(404).json({message: "No tasks Found. Create one"})
        }

        res.status(200).json(tasks)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


export const viewTaskByCategory = async (req,res) => {
    const {category} = req.params
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