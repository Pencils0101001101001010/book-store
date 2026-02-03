// Importing Express framework
import express from "express";
// Importing MongoDB connection string and port from config file

// Importing Mongoose to interact with MongoDB
import mongoose from "mongoose";
// Importing routes for books and users
import bookRoute from "./routes/bookRoute.js";
import userRoute from "./routes/user.js";
// Middleware for parsing cookies
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// Importing CORS to handle cross-origin requests
import cors from "cors";
import { PORT } from "./config.js";

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// first way to use cors:
app.use(
  cors({
    origin: [process.env.FRONTENDPORT], // Allow requests from frontend running on localhost:5173
    credentials: true, // Allow cookies and authentication headers
  }),
);
app.use(cookieParser());

//second and better way to use cors, this way we have more control:
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// );

// Basic route for testing server response
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN stack");
});

// Mounting book and user routes
app.use("/books", bookRoute);
app.use("/user", userRoute);

// Connecting to MongoDB using Mongoose
mongoose
  .connect(process.env.mongoDB)
  .then(() => {
    console.log("Connected to MongoDB");
    // Starting the server once DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    // Logging any connection errors
    console.log(error);
  });
