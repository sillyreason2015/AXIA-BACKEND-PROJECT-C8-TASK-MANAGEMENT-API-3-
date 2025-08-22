import User from "../../schema/userSchema.js";

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const { _id: reqId, isAdmin } = req.user;

    try {
        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // only admin or the user themselves can delete
        if (id.toString() !== reqId.toString() && !isAdmin) {
            return res.status(403).json({ message: "You are not authorized to carry out this action" });
        }

        // Delete the user
        await User.findByIdAndDelete(id);

        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};
