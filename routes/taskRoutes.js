import router from 'express'
import authMiddleware from '../middleware/authMiddleware.js'

import {createTask} from '../controllers/taskApi/taskBarrel.js'
import {viewTask, viewAllTasks, viewTaskByCategory} from '../controllers/taskApi/taskBarrel.js'
import {updateTask} from '../controllers/taskApi/taskBarrel.js'
import {deleteTask} from '../controllers/taskApi/taskBarrel.js'


const taskRouter = router()


taskRouter
.post('/create', authMiddleware, createTask)
.get('/all', authMiddleware, viewAllTasks)
.get('/:id',authMiddleware, viewTask )
.get('/category/:category', authMiddleware, viewTaskByCategory)
.put('/update/:id', authMiddleware, updateTask)
.delete('/delete/:id', authMiddleware, deleteTask)

export default taskRouter