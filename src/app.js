const express = require ( 'express')
const cookieparser = require('cookie-parser')



const app = express()

app.use(express.json())
app.use(cookieparser())

const authrouter= require('./routes/auth.routes')

app.use( '/api/auth' , authrouter)

module.exports = app   