import { MongoClient } from "mongodb";
import mongoose from "mongoose";
require('dotenv').config();
const {
    MONGO_URI='mongodb://localhost/quizapp'
}=process.env;

export const client=new MongoClient(MONGO_URI);
export const db=client.db();
mongoose.connect(MONGO_URI,(err)=>{
    if(err){
        console.error(err);
    }else{
        console.log('Connected to database');
    }
})