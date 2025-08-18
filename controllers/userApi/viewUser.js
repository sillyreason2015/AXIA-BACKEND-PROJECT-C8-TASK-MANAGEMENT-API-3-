import User from "../../schema/userSchema.js";


export const viewUser = async (req, res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user
    if(id.toString() !== _id.toString() && !isAdmin){
        return res.status(400).json({message: "You are not authorized to carry out this action"})
    }
    try{
        const user = await User.findById(id).select("-lastOtpSentAt -password -_id -updatedAt -createdAt -__v -isPrivate -isAdmin -isVerified ")
        if(!user){
            return res.status(400).json({message: "This user does not exist.Please register to continue"})
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


export const viewUsers = async (req, res) => {
    const {isAdmin} = req.user
    if(!isAdmin){
        return res.status(400).json({message: "You are not authorized to view this user"})
    }

    try{
        const users = await User.find().select("-lastOtpSentAt -password -_id -updatedAt -createdAt -__v -isAdmin -isVerified ")
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}