import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDb from './database/database.js'



const app = express()

connectDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())


dotenv.config()
const port = process.env.PORT



app.listen(port,()=>{
    console.log(`Our app is up and running on ${port}`)
})



