import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env file

const connectDb = async () => {
    try{
        // Connect to MongoDB using URL from environment variables
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true  
        })
        console.log('Connected to MongoDB') 
    }catch(error){
        res.status(500).json({message: error.message}) 
    }
}

export default connectDb 
