import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { SECRET } from "../config.js";
import nodemailer from "nodemailer";
 

//* signup
export const signupUser = async (request, response) => {
  const { email, password, name } = request.body;
  try {
    const hash = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hash,
    };
    const user = await User.create(newUser);
    if (!request.body.email || !request.body.password || !request.body.name) {
      return response
        .status(400)
        .json({ message: "Please provide all the details" });
    }
    if(!validator.isEmail(email)){
      return response
       .status(400)
       .json({ message: "Please provide a valid email" });
    }
    if(!validator.isStrongPassword(password)){
      return response
       .status(400)
       .json({ message: "Password not strong enough" });
    }



    if (user) {
      user.save();
      console.log("User Signup Successful", user)
      const token = jwt.sign({ id: user._id }, "secret", {expiresIn: "3d"})
      return response.status(200).json({ message: "user created",  user, token });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//* login
export const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user || !user.email) {
      return response
        .status(400)
        .send({ message: "Email is required to login." });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return response
       .status(400).json({ message: "Invalid password."})
    }
    const token = jwt.sign({ id: user._id }, SECRET, {expiresIn: "1d"})
                                    //*httpOnly is so that no one can access your toke with javaScript.
    response.cookie('token', token, {httpOnly:true ,maxAge: 360000} )
    return response.status(200).json({ message:"User login with token.",email, token })

  } catch (error) {
    response
      .status(500)
      .json({ message: "Something went wrong in user login" });
  }
};

//*Forgot Password

export const forgotPassword = async (request, response) => {
  const { email } = request.body;
  try {
    const user = await User.findOne({email})
    if ( !user || !user.email) {
      return response
       .status(401)
       .send({ message: "Email not registered." });
       
    }
    const token = jwt.sign({ id: user._id }, SECRET, {expiresIn: "5m"})
    //*httpOnly is so that no one can access your toke with javaScript.
response.cookie('token', token, {httpOnly:true ,maxAge: 360000} )
response.status(200).json({ message:"User login with token.",email, token })
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sjuniversalpaint@gmail.com',
        pass: 'iwjz hnop wrzn egyf'
      }
    });
    
    var mailOptions = {
      from: 'sjuniversalpaint@gmail.com',
      to: email,
      subject: 'Reset Password',
      text:  `http://localhost:5173/user/resetPassword/${token}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        return response.json({ message: " error sending email"})
      } else {
        return response.json({status: true, message: "email sent"})
      }
    }); 
  } catch (error) {
    console.log(error)
  }
}

//*Reset Password
export const resetPassword = async (request, response) => {
  const {token} = request.params ;
  const {password} = request.body;
  try {
     const decoded = await jwt.verify(token,  SECRET);
     const id = decoded.id;
     const hashPassword = await bcrypt.hash(password, 10)
     await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
     return response.json({status: true, message: "updated password"})
  } catch (error) {
    return response.json("invalid Token")
   
  }
}



