import User from "../../schema/userSchema.js"


export const updateUser = async (req,res) => {
    const {id} = req.params
    const {_id, isAdmin} = req.user

    if(id.toString() !== _id.toString() && !isAdmin){
        return res.status(400).json({message: "You are not authorized to carry out this action"})
    }
    try{
        const update = {
            ...req.body,
            password:hashPassword
        }

        if(update.password){
            const salt = await bcrypt.genSalt(10)
            update.password = await bcrypt.hash(salt, update.password)
        }

        const user = await User.findByIdAndUpdate(
            id, 
            update,
            {new: true, runValidators: true}
        )

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json({message: "User Information updated Successfully"})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}