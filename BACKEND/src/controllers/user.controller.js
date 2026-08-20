import User from "../models/user.model.js";


export const getCurrentUser = async (req,res) => {
    

    try {
        
        const userId = req.userId ;
        const user = await User.findById(userId)

        if( !user ){

            return res.status(400).json({message:"user does not found"})

        }
        
        return res.status(200).json(user)


    } catch (error) {
        console.log( error )
        return res.status(500).json({ message: `Get user controller error, Failed to get Current User ${error}`})

    }
}

export const purchaseCredits = async (req, res) => {
    try {
        const { creditsAmount } = req.body;
        const userId = req.userId;

        if (!creditsAmount || isNaN(creditsAmount) || Number(creditsAmount) <= 0) {
            return res.status(400).json({ message: "Invalid credits amount requested." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.credits += Number(creditsAmount);
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error("Purchase credits error:", error);
        return res.status(500).json({ message: `Failed to purchase credits: ${error.message}` });
    }
};