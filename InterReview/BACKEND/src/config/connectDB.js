import mongoose from "mongoose";
import dotenv from 'dotenv' ; 
dotenv.config();


const connectDB  = async () => {

    try {
        //console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI)
        console.log( "Connected to Database !")
    } catch (error) {
        console.log( error )
    }
    
}


export default connectDB ;