import React from "react";

function UserCard({ user }) {
  const { firstName, lastName, about, photoUrl, gender, age, skills } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-sm hover:scale-[99.5%]">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{about}</p>
        {age && <span>{age}</span>}
        {gender && <span>{gender}</span>}
        {skills && <p>Skills: {skills.join(", ")}</p>}
        <div className="card-actions justify-center">
          <button className="btn btn-primary hover:scale-[101%]">Ignore</button>
          <button className="btn btn-secondary hover:scale-[101%]">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
