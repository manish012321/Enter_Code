import mongoose from 'mongoose';
import {ENV} from './env.js';

export const connectDB = async() => {
 try {
    const connect = await mongoose.connect(ENV.DB_URL)
    console.log("Connect to db",connect.connection.host)
 } catch (error) {
    console.error("Error to connecting mongodb db",error)
    process.exit(1) //0 is succes 
 }
}