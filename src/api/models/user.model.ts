
import mongoose from 'mongoose';
import {db} from '../../db';
//validator

export interface UserDocument extends mongoose.Document{
    username:String,
    password:String,
    name:String,
    surname:String,
    email:String,
    role:String

}
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,

    },
    surname:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String
    }
})

export const User=mongoose.model("User",userSchema);
