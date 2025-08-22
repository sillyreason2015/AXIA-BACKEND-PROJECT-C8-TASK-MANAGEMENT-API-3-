import User from "../../schema/userSchema.js";

// Get all users
export const viewUsers = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'You are not authorized to carry out this action' });
    }

    try {
        const users = await User.find().select(
            '-_id -password -isPrivate -isVerified -createdAt -updatedAt -__v -lastOtpSentAt -isAdmin -otp -otpExpires'
        );

        if (!users.length) {
            return res.status(404).json({ message: "There are currently no users" });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single user 
export const viewUser = async (req, res) => {
    const { id } = req.params;

    if (req.user._id.toString() !== id.toString() && !req.user.isAdmin) {
        return res.status(403).json({ message: "You are not authorized to carry out this action" });
    }

    try {
        const user = await User.findById(id).select(
            "-lastOtpSentAt -password -_id -updatedAt -createdAt -__v -isAdmin -isVerified"
        );

        if (!user) {
            return res.status(404).json({ message: "This user does not exist. Please register to continue" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
