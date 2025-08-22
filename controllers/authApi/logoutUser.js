//logout user
export const logoutUser = async (req, res) => {
    try {
        // Clear the JWT token cookie
        res.clearCookie('token', {
            httpOnly: true, 
            sameSite: 'strict',  
            secure: false,       
            path: '/'   
        })

        // Send success response
        return res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
