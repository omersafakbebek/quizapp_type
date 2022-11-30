import { client } from "./db"
import mongoose from 'mongoose'

global.afterAll(async ()=>{
    await client.close();
    await mongoose.connection.close();
});