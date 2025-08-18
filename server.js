import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDb from './database/database.js'
import userRouter from './routes/userRoutes.js'
import passwordRouter from './routes/passwordRoutes.js'
import otpRouter from './routes/otpRoutes.js'
import authRouter from './routes/authRoutes.js'



const app = express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())


dotenv.config()
const port = process.env.PORT


app.use('/api', userRouter)
app.use('/api/password', passwordRouter)
app.use('/api/otp', otpRouter)
app.use('/api', authRouter)



app.listen(port,()=>{
    console.log(`Our app is up and running on ${port}`)
})



