const { Timestamp } = require('mongodb')
const mongoose = require( 'mongoose' )

const blacklisttokenschema = new mongoose.Schema({

    token:{
        type: String,
        required: [ true , "Token is required to be add in blacklist"]
    },
   
 }, {
        timestamps: true 
})

const tokenblacklistmodel = mongoose.model("blacklisttoken" , blacklisttokenschema)