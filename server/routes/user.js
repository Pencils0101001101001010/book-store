// Importing Express framework and creating a router for user-related routes
import express, { request } from "express";
// Importing controller functions that handle signup, login, password reset, etc.
import {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controller/UserController.js";

// Importing JWT for token generation and verification
import jwt from "jsonwebtoken";
// Importing dotenv to load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Creating a new Express router instance
const router = express.Router();

//*signup route
// POST request to /signup will trigger signupUser controller
router.post("/signup", signupUser);

// POST request to /login will trigger loginUser controller
router.post("/login", loginUser);

// POST request to /forgot-password will trigger forgotPassword controller
router.post("/forgot-password", forgotPassword);

// POST request to /reset-password/:token will trigger resetPassword controller
router.post("/reset-password/:token", resetPassword);

//* verify User
// Middleware function to check if a user has a valid JWT token stored in cookies
export const verifyUser = async (request, response, next) => {
  const token = request.cookies.token; // Extract token from cookies
  try {
    if (!token) {
      // If no token is found, return an error response
      return response.json({ status: false, message: "no token" });
    }
    // Verify the token using the secret stored in environment variables
    const decoded = await jwt.verify(token, process.env.SECRET);
    // If verification succeeds, move to the next middleware/route handler
    next();
  } catch (error) {
    // If verification fails, return the error
    return response.json(error);
  }
};

// Route to verify token validity
router.get("/verify", verifyUser, (request, response) => {
  response.json({ status: true, message: "valid token" });
});

//*logout
// Route to clear the token cookie and log the user out
router.get("/logout", (request, response) => {
  response.clearCookie("token");
  response.json({ status: true, message: "logged out" });
});

// Exporting router so it can be mounted in index.js
export default router;
