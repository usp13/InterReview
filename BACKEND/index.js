import dns from 'node:dns';

dns.setServers([
  '8.8.8.8',
  '1.1.1.1'
]);

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/connectDB.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRouter from './src/routes/auth.route.js';
import userRouter from './src/routes/user.route.js';
import interviewRouter from './src/routes/interview.routes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true ,
})
);

const PORT = process.env.PORT || 6000;

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth' , authRouter) ;
app.use( '/api/user' , userRouter) ; 
app.use('/api/interview' , interviewRouter) ; 



app.get('/', (req, res) => {
  res.json({ message: "Server Started !" });
});

// connectDB();
// app.listen(PORT, () => {
//   console.log(`Server has started on Port ${PORT}`);
// });


const startServer = async () => {
  
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server has started on Port ${PORT}`);
  });
};

startServer();