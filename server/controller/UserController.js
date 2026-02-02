// Importing User model to interact with database
import { User } from "../models/userModel.js";
// Importing bcrypt for password hashing and comparison
import bcrypt from "bcrypt";
// Importing JWT for token generation
import jwt from "jsonwebtoken";
// Importing validator for email and password validation
import validator from "validator";
// Importing nodemailer for sending emails
import nodemailer from "nodemailer";
// Importing dotenv to load environment variables
import dotenv from "dotenv";
dotenv.config();

//* signup
export const signupUser = async (request, response) => {
  const { email, password, name } = request.body;
  try {
    // Hashing the password before saving
    const hash = await bcrypt.hash(password, 10);

    // Creating a new user object
    const newUser = {
      name,
      email,
      password: hash,
    };

    // Saving the new user to the database
    const user = await User.create(newUser);

    // Validating required fields
    if (!request.body.email || !request.body.password || !request.body.name) {
      return response
        .status(400)
        .json({ message: "Please provide all the details" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return response
        .status(400)
        .json({ message: "Please provide a valid email" });
    }

    // Validating password strength
    if (!validator.isStrongPassword(password)) {
      return response
        .status(400)
        .json({ message: "Password not strong enough" });
    }

    if (user) {
      user.save();

      // Generating a JWT token for the user
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "3d" });
      return response
        .status(200)
        .json({ message: "user created", user, token });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

//* login
export const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    // Find user by email
    const user = await User.findOne({ email: email });

    if (!user || !user.email) {
      return response
        .status(400)
        .send({ message: "Email is required to login." });
    }

    // Compare entered password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return response.status(400).json({ message: "Invalid password." });
    }

    // Generate JWT token if login is successful
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });

    // Store token in httpOnly cookie for security
    response.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return response
      .status(200)
      .json({ message: "User login with token.", email, token });
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
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user || !user.email) {
      return response.status(401).send({ message: "Email not registered." });
    }

    // Generate a short-lived JWT token for password reset
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "5m",
    });

    // Store token in httpOnly cookie
    response.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    response
      .status(200)
      .json({ message: "User login with token.", email, token });

    // Configure nodemailer to send reset password email
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sjuniversalpaint@gmail.com", // sender email
        pass: "iwjz hnop wrzn egyf", // app password (should be in .env!)
      },
    });

    // Email options including reset link
    var mailOptions = {
      from: "sjuniversalpaint@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/user/resetPassword/${token}`,
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return response.json({ message: " error sending email" });
      } else {
        return response.json({ status: true, message: "email sent" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
