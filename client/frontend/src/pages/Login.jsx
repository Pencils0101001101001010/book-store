import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack"; // Snackbar notifications

// eslint-disable-next-line react/prop-types
const Login = ({ setIsLoggedIn }) => {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Loading state for spinner
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation
  const { enqueueSnackbar } = useSnackbar(); // Snackbar for feedback

  axios.defaults.withCredentials = true; // Send cookies/session with requests

  // Function to handle login request
  const handleCreateUser = () => {
    // Basic validation (note: condition could be improved)
    if (!password || !email < 0) {
      enqueueSnackbar(`Check email or password`, { variant: "error" });
    }
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_BACKENDPORTHOLL}/user/login`, {
        email,
        password,
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("user logged in :]", { variant: "success" });
        setIsLoggedIn(true); // Update global login state
        if (email && password) {
          navigate("/"); // Redirect to home
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`Failed to login. `, { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />

      {/* Login form */}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[400px] p-4 mx-auto">
        {loading ? <Spinner /> : ""}
        <h1 className="text-4xl my-4 font-semibold ">Login</h1>

        {/* Email input */}
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500 ">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // update state
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        {/* Password input */}
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500 ">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // update state
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        {/* Login button */}
        <button
          className="p-2 bg-gradient-to-tr hover:to-blue-100 from-sky-400 to-green-600 m-8 rounded-xl mb-5"
          onClick={handleCreateUser}
          disabled={loading} // disable while loading
        >
          login
        </button>

        {/* Links for password reset and signup */}
        <div className="items-center ml-16 ">
          <Link
            to={"/forgotPassword"}
            className="hover:text-white text-sky-400"
          >
            Forgot Password?
          </Link>
          <p>
            Already have an account?{" "}
            <Link className="text-sky-400 hover:text-white" to={"/user/signup"}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
