// Importing Express framework to create routes
import express from "express";
// Importing the Book model to interact with MongoDB
import { Book } from "../models/bookModel.js";
import { verifyUser } from "./user.js";

// Creating a router object to define routes separately from the main app
const router = express.Router();

//Route for Save a new Book
router.post("/", verifyUser, async (request, response) => {
  try {
    // Creating a new book object from request body
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    // Saving the new book to the database
    const book = await Book.create(newBook);

    // Validating that all required fields are provided
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({ message: "Please provide all the details" });
    }

    // Sending back the created book with a 201 (Created) status
    return response.status(201).send(book);
  } catch (error) {
    // Logging error and sending back a 500 (Server Error) response
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//get all books
router.get("/", async (request, response) => {
  try {
    // Fetching all books from the database
    const books = await Book.find({});

    // Returning the count and the list of books
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get a single book by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Finding a book by its unique MongoDB ID
    const book = await Book.findById(id);

    // Returning the found book
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update book
router.put("/:id", verifyUser, async (request, response) => {
  try {
    // Validating that all required fields are present
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Please provide all the details required.",
      });
    }

    const { id } = request.params;

    // Updating the book by ID with new data
    const result = await Book.findByIdAndUpdate(id, request.body);

    // If no book is found, return a 404 error
    if (!result) {
      return response.status(404).send({
        message: "Book not found",
      });
    }

    // Sending success message after update
    return response.status(200).json({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Delete a book by ID
router.delete("/:id", verifyUser, async (request, response) => {
  try {
    const { id } = request.params;

    // Deleting the book from the database
    const result = await Book.findByIdAndDelete(id);

    // If book not found, return 404
    if (!result) {
      return response.status(404).send({
        message: "Book not found",
      });
    }

    // Sending success message after deletion
    return response.status(200).json({
      message: "Book Deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Exporting router so it can be mounted in the main app
export default router;
