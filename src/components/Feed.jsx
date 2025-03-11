import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";

const Feed = () => {
  const feedData = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const fetchFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res)
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    feedData && (
      <div className="flex justify-center my-[5vh]">
        <UserCard user={feedData[1]} />
      </div>
    )
  );
};

export default Feed;
