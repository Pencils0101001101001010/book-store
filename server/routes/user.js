import express, { request } from "express";
import {
  signupUser,
  loginUser,
  forgotPassword,
  resetPassword,
  
} from "../controller/UserController.js";
import { SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const router = express.Router();

//*signup route
router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);




//* verify User
 const verifyUser = async (request, response, next) => {
    const token = request.cookies.token;
     try {
        if (!token) {
       return response.json({status: false, message: "no token"})
      }
      const decoded = await jwt.verify(token, SECRET);
      next()  
     } catch (error) {
       return response.json(error);
     } 
     
   }

router.get("/verify", verifyUser, (request, response) => {
    response.json({status: true, message: "valid token"})
});

//*logout
 router.get("/logout", (request, response) => {
    response.clearCookie("token");
    response.json({status: true, message: "logged out"})
});



export default router;
