import express from "express";
import {  mongoDB, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js"
import userRoute from "./routes/user.js"
import cookieParser from "cookie-parser" 
// import dotenv from 'dotenv'
// dotenv.config()

import cors from 'cors';


const app = express();

app.use(express.json());

// first way to use cors:
app.use(cors({
  origin: [ 'http://localhost:5173'],
  credentials: true
}));
app.use(cookieParser());
//second and better way to use cors, this way we have more control:
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
    
//   })
// );



app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack");
});

app.use('/books', bookRoute);
app.use('/user', userRoute);



mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen( PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
