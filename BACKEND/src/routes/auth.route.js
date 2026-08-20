import express from 'express' ;
import { googleAuth, logout, signup, login } from '../controllers/auth.controller.js';

const authRouter = express.Router() ; 

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/google' , googleAuth)

authRouter.get('/logout', logout) ;


export default authRouter ; 