import jwt from 'jsonwebtoken'            
import User from '../schema/userSchema.js' 

const authMiddleware = async (req, res, next) => {
    const accessToken = req.cookies.token          // Get the JWT token from cookies
    const jwtSecret = process.env.ACCESS_TOKEN     // Get secret key from environment variables

    if (!accessToken) {                            // If token is missing
        return res.status(401).json({ message: "Please Login First" }) // Unauthorized
    }

    try {
        const decoded = jwt.verify(accessToken, jwtSecret) // Verify token and decode payload
        const userId = decoded.userId                     // Extract userId from token

        if (!userId) {                                   // If token does not contain userId
            return res.status(401).json({ message: "Invalid Token" })
        }

        const verifiedUser = await User.findById(userId) 
        if (!verifiedUser) {                          
            return res.status(401).json({ message: "Invalid User" })
        }

        // Attach user info to request object
        req.user = {
            _id: verifiedUser._id,
            isAdmin: !!verifiedUser.isAdmin,           
            email: verifiedUser.email,                  
            username: verifiedUser.username             
        }

        next() // Proceed to next middleware or controller
    } catch (error) {
        res.status(500).json({ message: error.message }) 
    }
}

export default authMiddleware 
