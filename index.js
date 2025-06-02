import express from 'express';
import mongoose from 'mongoose';
import router from './router/post.router.js';
import dotenv from 'dotenv';
import connectdb from './config/db.js';
import cors from 'cors';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/post',router);

connectdb();

const Port = process.env.PORT || 5000 ;

app.listen(Port,()=>{
  console.log("Server is running at 5000...");
});

app.get('/',(req,res)=>{
  res.send("HELLO");
});






