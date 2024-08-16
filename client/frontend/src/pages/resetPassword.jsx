import { useState } from "react";
import BackButtonLogin from "../components/home/BackButtonLogin";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {token} = useParams()
  const navigate = useNavigate();

  const handelSendClick = (e) => {
    e.preventDefault();
    setLoading(false);

    axios
      .post("http://localhost:5555/user/reset-password/"+token, {
        password,
      })
      .then(response => {
        if (response) {
          navigate("/user/login");
        }
        console.log(response.data)
      })
      .catch((err) => {
        alert("Error", { variant: "error" });
        console.log(err);
      });
  };

  return (
    <div className="p-4">
      <BackButtonLogin />
      
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[400px] p-4 mx-auto">
        {loading ? <Spinner /> : ""}
        <h1 className="text-4xl my-4 font-semibold ">Reset Password</h1>

        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500 ">New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button
          className="p-2 bg-gradient-to-tr hover:to-blue-100 from-sky-400 to-green-600 m-8 rounded-xl mb-1"
          onClick={handelSendClick}
          disabled={loading}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
