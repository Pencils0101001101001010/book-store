// Importing Mongoose to define a schema for users
import mongoose from "mongoose";
// Importing bcrypt for password hashing
import bcrypt from "bcrypt";

// Defining the schema for a User collection
const userSchema = mongoose.Schema(
  {
    // Name field - must be unique and required
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // Email field - must be unique and required
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Password field - required
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  },
);

// Static method for signing up a user
userSchema.statics.signup = async function (email, password) {
  // Check if a user with this email already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error("User already exists");
  }

  // Generate a salt for hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password with the salt
  const hash = await bcrypt.hash(password, salt);

  // Create a new user with hashed password
  const user = await this.create({ email, password: hash });

  return user;
};

// Exporting the User model to interact with MongoDB
export const User = mongoose.model("User", userSchema);
