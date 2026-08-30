import express from 'express' ;
import { getCurrentUser, purchaseCredits } from '../controllers/user.controller.js';
import isAuth from '../middlewares/isAuth.js';

const userRouter = express.Router() ; 

userRouter.get( '/current-user' , isAuth , getCurrentUser ) ;
userRouter.post( '/purchase-credits' , isAuth , purchaseCredits ) ;

export default userRouter ; 