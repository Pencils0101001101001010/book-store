import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link,   useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BookCard from "../components/home/BooksCard.jsx";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const navigate = useNavigate();
 axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5555/user/verify')
    .then(response => {
        if (response.data.status){
            setIsLoading(false);
        }else{
            navigate("/")
        }
    })
  })

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="hover:text-sky-400 hover:underline px-5 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>

      |


        <button
          className="hover:text-sky-400  hover:underline border-l- px-5 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-end items-center">
        <h1 className="text-1xl my-8 "> </h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
        
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
};

export default Dashboard;
