const { Router } = require('express')

const authcontroller = require('../controllers/auth.controller')

const authrouter = Router()


/**
 * @route POST /api/auth/register
 * @description register a new user 
 * @access Public
 */

authrouter.post("/register" , authcontroller.registerusercontroller )

/**
 * @route POST /api/auth/login
 * @description login user 
 * @access Public
 */

authrouter.post("/login" , authcontroller.loginusercontroller )




module.exports= authrouter