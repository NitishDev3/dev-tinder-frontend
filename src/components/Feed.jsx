import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchFeed = async () => {
    if (feedData) return;
    if(!user){
      navigate("/login")
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feedData) {
    return;
  }

  if (feedData.length === 0) {
    return (
      <div className="flex justify-center text-3xl my-20">
        No new users found!!!
      </div>
    );
  }

  return (
    <div className="flex justify-center my-[1.5vh]">
      <UserCard user={feedData[0]} />
    </div>
  );
};

export default Feed;
