import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import loginRouter  from './routes/authentication.js';
import ApiRouter from './routes/api.js';
import UserRouter from "./routes/user.js"
import countRouter from "./routes/counts.js"

dotenv.config();
const app=express();

// const PORT = process.env.PORT || 5000; 
const Port=5000;
const database_Url=process.env.DATABASE_URL;

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/auth',loginRouter)
app.use('/api',ApiRouter)
app.use('/users',UserRouter)
app.use('/count',countRouter)


mongoose.connect(database_Url)
.then(()=>{
    console.log("mongodb connected")
})
.catch((error)=>{
    console.log(error)
});

app.listen(Port,()=>{
    console.log(`server is running on port 5000` )
})