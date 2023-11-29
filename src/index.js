// first function use to connect database connection
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`🙏🏻 Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

// Second function use to connect database  :-)

// import mongoose from "mongoose";
// import {DB_NAME} from './constants';

// ( async() => {
//     try {
//       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//     } catch (error) {
//         console.log("ERROR: ",  error)
//     }
// } )() // IIFE -> immediately invoked function expression this iife works firstly immediately call in this function