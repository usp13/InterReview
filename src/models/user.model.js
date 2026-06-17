const mongoose = require( 'mongoose' )

const userschema = new mongoose.Schema ({

    username : {
        type : String,
        unique: [ true ,  'Username already taken!'], 
        required: true 
        
    }, 

    email : {
        type : String,
        unique: [ true ,  'Account already exists with this email address! '], 
        required: true 
        
    },

    password : {
        type : String,
        //unique: [ true ,  'Username already takem'], 
        required: true 
        
    }
})

const usermodel = mongoose.model("Users" , userschema)

module.exports = usermodel