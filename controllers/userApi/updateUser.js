import User from "../../schema/userSchema.js";
import bcrypt from 'bcrypt';

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { _id: reqId, isAdmin } = req.user;

    // Authorization check: only the user themselves or admin can update
    if (id.toString() !== reqId.toString() && !isAdmin) {
        return res.status(403).json({ message: "You are not authorized to carry out this action" });
    }

    try {
        const updates = { ...req.body };

        // Hash password if it's being updated
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select('-password -__v'); // Exclude sensitive fields

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User information updated successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
