import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestsSlice";

const Requests = () => {
  const requestsData = useSelector((store) => store.requests);
  console.log(requestsData);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requestsData || requestsData.length === 0) {
    return (
      <div className="flex justify-center text-3xl my-20">
        No new request!!!
      </div>
    );
  }

  return (
    <div className="w-[90%] md:w-1/2 my-4 mx-auto">
      <div className="text-center">
        <h1 className="text-3xl">Requests</h1>
        <div className="my-6">
          {requestsData.map((request) => {
            const { _id, firstName, lastName, about, photoUrl, age, gender } =
              request.fromUserId;
            return (
              <div
                key={_id}
                className="flex bg-base-200 border border-gray-700 rounded-lg my-2 p-4 hover:scale-[99%] justify-between items-center"
              >
                <div className="w-1/6 mr-4">
                  <img
                    src={photoUrl}
                    className="w-20 rounded-full"
                    alt="connection-user-photo"
                  />
                </div>
                <div className="w-4/6 text-left">
                  <h3 className="text-xl">{firstName + " " + lastName}</h3>
                  <p className="text-sm">{about}</p>
                  {age && gender && (
                    <p className="text-sm">{age + ", " + gender}</p>
                  )}
                </div>
                <div className="w-2/6 flex ">
                  <button
                    className="btn btn-primary mr-2 hover:scale-[104%]"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-secondary ml-2 hover:scale-[104%]"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
