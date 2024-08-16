// import { Link } from "react-router-dom"
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2 rounded-lg" src={logo} alt="open24" />
            <span className="text-xl tracking-tight items-start">
             <Link to={"/"}>Book Right</Link> 
            </span>
          </div>
          <div className="flex items-center gap-1">
             
            <div>
              <Link to={"/user/login"} className=" hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 bg-gradient-to-r from-sky-500 py-2 px-3 rounded-md space-x-1  to-green-500">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// <nav>
//   <div className="w-full h-16 items-center flex justify-between bg-sky-500 shadow-2xl  ">
//     <Link
//     to={"/"}
//     >
//     <h1 className="font-bold text-2xl text-sky-100 pl-4 hover:shadow-lg ">Books & More</h1>
//     </Link>
//     <div className="p-4  flex gap-4">
//     <Link to={"/user/signup"} >Sign up</Link>
//     <div className="hover:shadow-xl   pl-2">
//     <Link to={"/user/login"} >Login</Link>

//     </div>
//     </div>

//   </div>
// </nav>
