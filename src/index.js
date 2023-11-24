// import mongoose from "mongoose";
// import {DB_NAME} from './constants';

import dotenv from 'dotenv'
import connectDb from './db/index.js';


dotenv.config({
    path: './env'
})

connectDb()



// ( async() => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//     } catch (error) {
//         console.log("ERROR: ",  error)
//     }
// } )() // IIFE -> immediately invoked function expression this iife works firstly immediately call in this function