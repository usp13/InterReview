import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        unique: true,
        required:true
    },
    
    credits:{
        type:Number,
        default:100
    },

    password:{
        type:String,
        required:false
    }

}, {timestamps : true })

const User = mongoose.model( "user" , userSchema ) ;

export default User ;