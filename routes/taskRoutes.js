import router from 'express' 
import authMiddleware from '../middleware/authMiddleware.js' // Import authentication middleware

// Import task controllers
import { createTask } from '../controllers/taskApi/taskBarrel.js'
import { viewTask, viewAllTasks, viewTaskByCategory } from '../controllers/taskApi/taskBarrel.js'
import { updateTask } from '../controllers/taskApi/taskBarrel.js'
import { deleteTask } from '../controllers/taskApi/taskBarrel.js'

const taskRouter = router() // Create a new router instance

// Route to create a new task (requires authentication)
taskRouter.post('/create', authMiddleware, createTask)

// Route to view all tasks of the authenticated user
taskRouter.get('/all', authMiddleware, viewAllTasks)

// Route to view a specific task by ID
taskRouter.get('/:id', authMiddleware, viewTask)

// Route to view tasks filtered by category
taskRouter.get('/category/:category', authMiddleware, viewTaskByCategory)

// Route to update a task by ID
taskRouter.put('/update/:id', authMiddleware, updateTask)

// Route to delete a task by ID
taskRouter.delete('/delete/:id', authMiddleware, deleteTask)

export default taskRouter
