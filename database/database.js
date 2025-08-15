import mongoose from 'mongoose'


const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDb')
    }catch(error){
        console.log(error)
    }
}

 export default connectDb