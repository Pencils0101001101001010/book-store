import BackButton from "../components/BackButton";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()

 useEffect(() => {
  setIsLoading(true);
  axios.get(`http://localhost:5555/books/${id}`)
   .then((response) => {
     setAuthor(response.data.author);
     setTitle(response.data.title);
     setPublishYear(response.data.publishYear);
     setIsLoading(false);
     
   }).catch((error) => {
     console.log(error);
     setIsLoading(false);
     alert('An error happened. Please check console')
   })
 }, [])

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setIsLoading(true);
    axios
     .put(`http://localhost:5555/books/${id}`, data)
     .then(() => {
      setIsLoading(false);
      enqueueSnackbar("Book Edited successfully:]", { variant: 'success'})
      navigate("/");
     })
     .catch((error) => {
        console.log(error);
        // alert('There was an error check console.')
        enqueueSnackbar('Error', { variant: 'error'})
        setIsLoading(false);
      });
  }

  return <div className="p-4">
    <BackButton />
    <h1 className="text-3xl my-4">Edit Book</h1>
    {isLoading ? <Spinner/> : ''}
    <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="py-4">
        <label className="text-xl mr-4 text-gray-500">Title</label>
        <input 
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-2 border-gray-500 px-4 py-2 w-full"
         />
      </div>
      <div className="py-4">
        <label className="text-xl mr-4 text-gray-500">Author</label>
        <input 
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="border-2 border-gray-500 px-4 py-2 w-full"
         />
      </div>
      <div className="py-4">
        <label className="text-xl mr-4 text-gray-500">Publish Year</label>
        <input 
        type="text"
        value={publishYear}
        onChange={(e) => setPublishYear(e.target.value)}
        className="border-2 border-gray-500 px-4 py-2 w-full"
         />
      </div>
      <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}> 
      Save
      </button>
    </div>
  </div>;
};

export default EditBook;
