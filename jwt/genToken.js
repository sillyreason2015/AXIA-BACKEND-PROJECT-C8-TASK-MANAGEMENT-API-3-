import jwt from 'jsonwebtoken' 
import dotenv from 'dotenv'     

dotenv.config() // Load environment variables from .env file

// Function to generate a JWT token with a given payload
const genToken = (payload) => {
    // jwt.sign(payload, secret, options)
    return jwt.sign(
        payload,    
        process.env.ACCESS_TOKEN,  
        { expiresIn: "3h" }       
    )
}

export default genToken 
