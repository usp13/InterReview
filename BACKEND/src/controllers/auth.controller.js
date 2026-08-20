import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000  
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                credits: user.credits
            }
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: `Signup error: ${error.message}` });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (!user.password) {
            return res.status(400).json({ message: "This email is registered via Google sign-in. Please log in with Google." });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = await genToken(user._id);

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                credits: user.credits
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ message: `Login error: ${error.message}` });
    }
};



export const googleAuth = async (req , res) => {
    
    try {
        
        const { name , email } = req.body ; 

        let user = await User.findOne( {email})

        if( !user ){
            user = await User.create({
                name , 
                email
            })
        }

        let token = await genToken( user._id)

        res.cookie( 'token' , token , {
            httpOnly:true ,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7*24*60*60*1000  //in ms  ( 7days ) 
        })

        return res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: `Google Auth error ${error}`})
        //console.log(error)
    }
}


export const logout = async (req,res) => {
    
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });
        return res.status(200).json({message:'Logout succesfull'})
    } catch (error) {
        //console.log(error)
        return res.status(500).json({ message: `Logout error ${error}`})
        
    }
}