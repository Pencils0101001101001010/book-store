// Importing the Book model so we can interact with the "books" collection in MongoDB
import { Book } from "./models/bookModel.js";

// Defining an asynchronous function to create a new book entry
const createBook = async (request, response) => {
  // Extracting values from the request body using destructuring
  const { title, author, publishYear } = req.body;

  try {
    // Using Mongoose's create method to insert a new book document into the database
    const book = await Book.create({ title, author, publishYear });

    // Sending back a success response with the newly created book
    res.status(200).json(book);
  } catch (error) {
    // Handling errors (e.g., validation issues) and sending a failure response
    res.status(400).json({ message: error.message });
  }
};

// Exporting the function so it can be used in other files
export default createBook;
