import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})) // .use are only use in configuration and middleware

app.use(express.json({limit: "16kb"}))   // express.json are used by backend file accepts they are coming from json to backend
app.use(express.urlencoded({extended: true, limit: "16kb"})) // express.urlencoded for url encoding
app.use(express.static("public"))  // serve static files from static folder for public use and caching data for example images fevicon

// // last three app.use for configuration

app.use(cookieParser())  //this are also configuration for cookies


//routes import
import userRouter from './routes/user.router.js'


//routes declaration
app.use("/api/v1/users", userRouter)

// http://localhost:8000/api/v1/users/register

export { app }