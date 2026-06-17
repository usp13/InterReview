const { JsonWebTokenError } = require('jsonwebtoken')
const usermodel = require( '../models/user.model')
const bcrypt = require( 'bcryptjs')
const jwt = require('jsonwebtoken')

// /**
//  * 
//  * @name  resgisterusercontroller
//  * @description regiser a new user , expect a username , email , password 
//  * @access public 
// */
async function registerusercontroller( req , res ) {

    const { username , email , password } = req.body

    if( !username || !email || !password ){

        return res.status(400).json({
            message: "Plaese enter username , emual or password"
        }) 
    }

    const useralready = await usermodel.findOne({
        $or: [{username} , {email}]

    })

    if( useralready ){
        
        return res.status(400).json({
            message: "account already exists with this username or email"
        }) 

    }

    const hash = await bcrypt.hash(password , 10 )

    const user = await usermodel.create({
        username , 
        email ,
        password : hash 
    })

    const token = jwt.sign(
        {id: user._id, username: user.username},
        process.env.JWT_SECRET,
        { expiresIn : '1d'}
    )

    res.cookie('token' , token )

    res.status(201).json({
        message: "User successfully registered !",
        user:{
            id: user._id,
            email : user.email , 
            username: user.username

        }
    })

}

// /**
//  * @name loginusercontroller 
//  * @description Login a user 
//  * @access public
//  */

async function loginusercontroller (req,res) {

        const { email , password } = req.body 

        const user = await usermodel.findOne({ email })

        if( !user ){
            return res.status(400).json({
                message: "Invalid Password or email"
            })
        }

    const ispasswordvalid = await bcrypt.compare( password , user.password ) 

    if( !ispasswordvalid ){
        return res.status(400).json({
            message: "Invalid Password !"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },

        process.env.JWT_SECRET,
        { expiresIn : '1d'}
    )

    res.cookie('token' , token )

    res.status(200).json({
        message: "User successfully register !",
        user:{
            id: user._id,
            email : user.email , 
            username: user.username

        }
    })

    
}

module.exports = {
    registerusercontroller,
    loginusercontroller
} 