import Task from '../../schema/taskSchema.js'   
import { sendMail } from '../../utils/sendMail.js'     

export const createTask = async (req, res) => {
    const { _id, email, username } = req.user
    const { title, description, priority, category, deadline } = req.body
    
    // Check all required fields are provided
    if (!title || !description || !priority || !category || !deadline) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check that the deadline is not in the past
    if (deadline && new Date(deadline) < new Date()) {
        return res.status(400).json({ message: "Deadline cannot be in the past" });
    }

    try {
        // Check if a task with the same title already exists for this user
        const task = await Task.findOne({ title, userId: _id });
        if (task) {
            return res.status(400).json({ message: "This task already exists" });
        }

        // Create new task object
        const newTask = new Task({
            userId: _id,
            ...req.body,
            isCompleted: false  // Default to not completed
        });

        await newTask.save();  // Save task to database

        // Send response before sending email
        res.status(200).json({ message: "New Task created successfully" });

        // Prepare email notification
        const mail = {
            mailFrom: process.env.EMAIL_USER,
            mailTo: email,
            subject: 'New Task Created Successfully',
            body: `Hi, ${username}. You just created a new task. Please login to your dashboard to see all tasks.`
        };

        // Send email notification
        await sendMail(mail);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
