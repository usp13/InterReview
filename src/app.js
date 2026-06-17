const express = require ( 'express')

const app = express()

app.use(express.json())

const authrouter= require('./routes/auth.routes')

app.use( '/api/auth' , authrouter)

module.exports = app   