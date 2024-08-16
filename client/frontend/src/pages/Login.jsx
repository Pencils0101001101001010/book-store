import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const { signup, error, isLoading} = useSignup();

  axios.defaults.withCredentials = true;
  const handleCreateUser = () => {
    if (!password || !email < 0) {
      enqueueSnackbar(`Check email or password`, { variant: "error" });
    }
    setLoading(true);

    axios
      .post("http://localhost:5555/user/login", {
        email,
        password,
      })
      .then(() => {
        setLoading(false);
        enqueueSnackbar("user logged in :]", { variant: "success" });
        console.log("user", { email, password });
        if (email && password) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`Failed to login. `, { variant: "error" });
        // alert("There was and error with handleCreateUser event listener.")
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[400px] p-4 mx-auto">
        {loading ? <Spinner /> : ""}
        <h1 className="text-4xl my-4 font-semibold ">Login</h1>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500 ">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500 ">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="p-2 bg-gradient-to-tr hover:to-blue-100 from-sky-400 to-green-600 m-8 rounded-xl mb-5"
          onClick={handleCreateUser}
          disabled={loading}
        >
          login
        </button>
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

        {/* {error && <div className="bg-yellow-400">{error}</div>} */}
      </div>
    </div>
  );
};

export default Login;
