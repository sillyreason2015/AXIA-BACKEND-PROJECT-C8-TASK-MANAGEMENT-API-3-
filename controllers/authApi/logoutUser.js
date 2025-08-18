import User from "../../schema/userSchema.js"

export const logoutUser = async (req, res) => {
    try{
        res
        .clearCookie('token', {
            httpOnly: true,
            sameSite: 'strict', 
            secure: false,
            path: '/'
        })
        await User.findByIdAndUpdate(req.user._id, { isActive: false })
        return res.status(200).json({message: "Logout successful"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}