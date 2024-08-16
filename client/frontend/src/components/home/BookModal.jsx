/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed backdrop-blur-lg bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center p-5 "
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] mx-w-full h-[400px] bg-gradient-to-t from-blue-500 to-green-400 rounded-xl flex flex-col relative px-4 py-10"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2
          className="w-fit 
         bg-sky-500 rounded-lg p-1"
        >
          {book.publishYear}
        </h2>
        <h4 className="my-2 underline text-gray-500 ">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-black-500 text-2xl" />
          <h2 className="my-1 text-black">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-black-500 text-2xl" />
          <h2 className="my-1 text-black">{book.author}</h2>
        </div>
        <p className="mt-4 text-black">Book Of your liking Info</p>
        <p className="my-4 text-black">
          316,263 views 31 Aug 2023 Learn the MERN stack (MongoDB, Express,
          React, Node.js) in this crash course for beginners. Here are some of
          the topics you will learn about: - Backend CRUD - Backend Router -
          CORS Policy - MongoDB operations - Frontend CRUD - Frontend Router{" "}
        </p>
      </div>
    </div>
  );
};

export default BookModal;
