import Task from '../../schema/taskSchema.js'

export const deleteTask = async (req, res) => {
    const userId = req.user._id
    const {id} = req.params
try{
    const task = await Task.findById(id)
    if(!task){
        return res.status(404).json({message: "This task does not exist"})
    }
    if(task.userId.toString() !== userId.toString()){
        return res.status(403).json({message: "You are not authorized to carry out this action"})
    }

    await Task.findByIdAndDelete(id)
    res.status(200).json({message: "Task deleted Successfully"})
}catch(error){
    res.status(500).json({message: error.message})
}
}