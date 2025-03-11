import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("nitish@gmail.com");
  const [password, setPassword] = useState("Nitish@123");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setErrorMsg("");
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (error) {
      console.log("ERROR: ", error);
      setErrorMsg(error.response.data || "Something went wrong!!");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
  });

  return (
    <div className="flex justify-center my-16">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title">Log IN</h2>
          <div className="my-2">
            <label className="">
              Email ID:
              <input
                id="email"
                type="text"
                placeholder="Enter Email Id"
                className="input input-md my-2"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className="">
              Password:
              <input
                type="password"
                placeholder="Enter Password"
                className="input input-md my-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-sm text-red-500">{errorMsg}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary my-2" onClick={handleLogIn}>
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
