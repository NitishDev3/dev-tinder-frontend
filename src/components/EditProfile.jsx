import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills.join(", "));

  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();

  const updateData = {
    firstName: firstName
      .split(" ")
      .map(
        (name) =>
          `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`
      )
      .join(" "),
    lastName: lastName
      .split(" ")
      .map(
        (name) =>
          `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`
      )
      .join(" "),
    age: age,
    gender: gender,
    photoUrl: photoUrl,
    skills: skills.split(",").map((skill) => skill.trim()),
    about: about,
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", updateData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      setIsEditEnabled(false);
    } catch (error) {
      console.log(error);
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="flex justify-center mx-7">
        <div className="bg-base-300 p-4">
          <h1 className="text-center mx-auto text-3xl font-semibold">
            Profile
          </h1>
          <label htmlFor="" className="block">
            First Name:
            <input
              type="text"
              placeholder="First Name"
              className="block input w-[30vw] input-sm"
              disabled={!isEditEnabled}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="" className="block my-2">
            Last Name:
            <input
              type="text"
              placeholder="Last Name"
              className="block input w-[30vw] input-sm"
              disabled={!isEditEnabled}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label htmlFor="" className="block my-2">
            Email:
            <input
              type="text"
              placeholder="Email"
              className="block input w-[30vw] input-sm"
              disabled
              value={user.emailId}
            />
          </label>
          <label htmlFor="" className="block my-2">
            Age:
            <input
              type="Number"
              placeholder="Age"
              className="block input w-[30vw] input-sm"
              disabled={!isEditEnabled}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label htmlFor="" className="block my-2">
            Gender:
            <input
              type="text"
              className="w-[30vw] block input input-sm"
              disabled={!isEditEnabled}
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value.toLowerCase())}
            />
          </label>
          <label htmlFor="" className="block my-2">
            About:
            <input
              type="text"
              placeholder="About"
              className="block input w-[30vw] input-sm"
              disabled={!isEditEnabled}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </label>
          <label htmlFor="" className="block my-2">
            Photo URL:
            <input
              type="text"
              placeholder="Photo URL"
              className="block input w-[30vw] input-sm"
              disabled={!isEditEnabled}
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </label>
          <label htmlFor="" className="block my-2">
            Skills:
            <input
              type="text"
              placeholder="Skills"
              className="block input w-[30vw] input-sm"
              disabled={!isEditEnabled}
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </label>
          {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
          <div className="flex justify-between">
            <button
              className="btn btn-sm btn-secondary my-2 mx-4 hover:scale-[105%]"
              onClick={() => setIsEditEnabled(!isEditEnabled)}
            >
              {isEditEnabled ? "Cancel" : "Edit Profile"}
            </button>

            <button
              className="btn btn-sm btn-primary my-2 mx-4 hover:scale-[105%]"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
      <div className="scale-90">
        <UserCard user={updateData} />
      </div>
    </div>
  );
};

export default EditProfile;
