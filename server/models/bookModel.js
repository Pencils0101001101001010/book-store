// Importing mongoose, which is an ODM (Object Data Modeling) library for MongoDB
// It allows us to define schemas and interact with MongoDB using JavaScript objects
import mongoose from "mongoose";

// Defining the schema for a "Book" collection
// A schema is like a blueprint that tells MongoDB what fields each document should have
const bookSchema = mongoose.Schema(
  {
    // Title of the book - must be a string and is required
    title: {
      type: String,
      required: true,
    },
    // Author of the book - also a string and required
    author: {
      type: String,
      required: true,
    },
    // Year the book was published - stored as a number and required
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    // The timestamps option automatically adds "createdAt" and "updatedAt" fields
    // This helps track when each document was created and last modified
    timestamps: true,
  },
);

// Creating a model from the schema
// A model is what we use in our code to interact with the actual MongoDB collection
// NOTE: The first argument ("Cat") is the name of the collection in MongoDB (pluralized to "cats")
// If you want this to represent books, you should change "Cat" to "Book"
export const Book = mongoose.model("Cat", bookSchema);
