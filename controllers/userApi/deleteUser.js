import User from "../../schema/userSchema.js";

export const deleteUser = async (req, res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user
    try{
    const user = await User.findById(id)
    if(!user){
        return res.status(400).json({message: "This user does not exist"})
    }

    if(id.toString() !== _id.toString() && !isAdmin){
        return res.status(403).json({message: "You are not authorized to carry out this action"})
    }

    await User.findByIdAndUpdate(id)
}catch(error){
    res.status(500).json({message: error.message})
}
}
