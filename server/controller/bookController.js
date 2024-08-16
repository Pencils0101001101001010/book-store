import { Book } from "./models/bookModel.js";


const createBook = async ( request, response ) => {
    const { title, author, publishYear } = req.body;

    try {
      
        const book = await Book.create({ title, author, publishYear,  });
        res.status(200).json(book);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

export default createBook;