import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
app.use(cors({  
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));  // .use are only use in configuration and middleware

app.use(express.json({limit: '10kb'})); // express.json are used by backend file accepts they are coming from json to backend

app.use(express.urlencoded({limit: '10kb' , extended: true})); // express.urlencoded for url encoding

app.use(express.static("public")) // serve static files from static folder for public use and caching data for example images fevicon

// last three app.use for configuration

app.use(cookieParser()) // this are also configuration for cookie 

// const port = process.env.PORT || 8000

export { app  } ;