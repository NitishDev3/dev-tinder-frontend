import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const [showSignUpPage, setShowSignUpPage] = useState(false);
  const [showSignUpToast, setShowSignUpToast] = useState(false);

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
      setErrorMsg(error.response.data || "Something went wrong!!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      setShowSignUpToast(true);
      setShowSignUpPage(false);
      setEmailId("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setTimeout(() => {
        setShowSignUpToast(false);
      }, 1500);
    } catch (error) {
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
          <h2 className="card-title self-center">
            {showSignUpPage ? "Sign Up" : "Log In"}
          </h2>
          <div className="my-2">
            {showSignUpPage && (
              <>
                <label className="">
                  First Name:
                  <input
                    id="firstName"
                    type="text"
                    placeholder="Enter First Name"
                    className="input input-md my-2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="">
                  Last Name:
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                    className="input input-md my-2"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
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
            <button
              className="btn btn-primary my-2"
              onClick={() => (showSignUpPage ? handleSignUp() : handleLogIn())}
            >
              {showSignUpPage ? "Sign Up" : "Log In"}
            </button>
          </div>
          <p>
            {showSignUpPage
              ? "Already have an account? "
              : "Don't have an account? "}
            <span
              className="underline hover:cursor-pointer"
              onClick={() => {
                setShowSignUpPage((pre) => !pre);
                setFirstName("");
                setLastName("");
              }}
            >
              {showSignUpPage ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>
        {showSignUpToast && (
          <div className="toast toast-top toast-center mt-20">
            <div className="alert alert-success text-white">
              <span>Signed Up Successfully! Kindly Log In to Continue</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
