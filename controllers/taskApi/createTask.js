import Task from '../../schema/taskSchema.js'
import { sendMail } from '../../utils/sendMail.js'


export const createTask = async (req, res) => {
    const {_id, email, username} = req.user
    const {title, description, priority, category, deadline} = req.body
    
    if(!title || !description || !priority || !category || !deadline){
        return res.status(400).json({message: "Please enter all fields"})
    }

    if(deadline && new Date(deadline) < new Date()){
        return res.status(400).json({message: "Deadline cannot be in the past"})
    }
    try{
        const task = await Task.findOne({title, userId: _id})
        if(task){
            return res.status(400).json({message: "This task already exists"})
        }
        const newTask = new Task({
            userId: _id,
            ...req.body,
            isCompleted: false
        })
        await newTask.save()
        res.status(200).json({message: "New Task created Successfully"})

    const mail = {
    mailFrom: process.env.EMAIL_USER,
    mailTo: email,
    subject: 'New Task created Successfully',
    body: `Hi, ${username}. You just created a new task. Please login to your dashboard to see all tasks`
   }

   await sendMail(mail)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}