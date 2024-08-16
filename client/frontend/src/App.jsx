import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DeleteBook from "./pages/DeleteBook.jsx";
import CreateBooks from "./pages/CreateBooks.jsx";
import ShowBooks from "./pages/ShowBooks.jsx";
import EditBook from "./pages/EditBook.jsx";
import SignUp from "./pages/SignUp.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import DontKnowKeyWord from "./pages/DontKnowKeyWord.jsx";
import ResetPassword from "./pages/resetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";


const App = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/forgotPassword" element={<DontKnowKeyWord />} />
         <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
         <Route path="/Dashboard" element={<Dashboard />}/>


          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBooks />} />
          <Route path="/books/details/:id" element={<ShowBooks />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
