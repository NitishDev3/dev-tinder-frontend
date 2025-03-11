import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";

const Connections = () => {
  const connectionsData = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connectionsData || connectionsData.length === 0) {
    return (
      <div className="flex justify-center text-3xl my-20">No Connections</div>
    );
  }

  return (
    <div className="w-[90%] md:w-1/2 my-4 mx-auto">
      <div className="text-center">
        <h1 className="text-3xl">Connections</h1>
        <div className="my-6">
          {connectionsData.map((connection) => {
            const { _id, firstName, lastName, about, photoUrl, age, gender } =
              connection;
            return (
              <div
                key={_id}
                className="flex bg-base-200 border border-gray-700 rounded-lg my-2 p-4 hover:scale-[99%]"
              >
                <div className="w-1/6 mr-4">
                  <img
                    src={photoUrl}
                    className="w-20 rounded-full"
                    alt="connection-user-photo"
                  />
                </div>
                <div className="w-5/6 text-left">
                  <h3 className="text-xl">{firstName + " " + lastName}</h3>
                  <p className="text-sm">{about}</p>
                  {age && gender && (
                    <p className="text-sm">{age + ", " + gender}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
