// import mongoose from "mongoose";
// import {DB_NAME} from './constants';

import dotenv from 'dotenv'
import connectDb from './db/index.js';


dotenv.config({
    path: './env'
})

connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running on port ${process.env.PORT}`)   
    })
    
})
.catch((err) => {
    console.log("Mongoose connection failed: " , err)
})



// ( async() => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//     } catch (error) {
//         console.log("ERROR: ",  error)
//     }
// } )() // IIFE -> immediately invoked function expression this iife works firstly immediately call in this function