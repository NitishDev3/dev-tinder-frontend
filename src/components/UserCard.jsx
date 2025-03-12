import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../store/feedSlice";
import axios from "axios";

function UserCard({ user, isBtnDisabled }) {
  const { _id, firstName, lastName, about, photoUrl, gender, age, skills } =
    user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm hover:scale-[99.5%] cursor-grab">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
        {skills && <p>Skills: {skills.join(", ")}</p>}
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary hover:scale-[101%]"
            onClick={() => handleSendRequest("ignored", _id)}
            disabled={isBtnDisabled}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary hover:scale-[101%]"
            onClick={() => handleSendRequest("interested", _id)}
            disabled={isBtnDisabled}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
