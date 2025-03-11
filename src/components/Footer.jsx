import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Footer = () => {
  const requestsData = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);
  const num = requestsData ? requestsData.length : 0;

  return (
    user && (
      <div className="dock bg-neutral text-neutral-content">
        <Link to={"/"}>
          <button>
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 22V12h6v10"
              />
            </svg>
          </button>
          <span className="text-xs">Home</span>
        </Link>

        <Link to={"/connections"}>
          <button className="dock-active">
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
              />
              <circle
                cx="9"
                cy="7"
                r="4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M23 21v-2a4 4 0 0 0-3-3.87"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 3.13a4 4 0 0 1 0 7.75"
              />
            </svg>
          </button>
          <span className="text-xs">Connections</span>
        </Link>
        <Link to={"/requests"}>
          <button>
            <span className="absolute bg-red-600 px-1 text-xs rounded-full -mt-3">
              {num}
            </span>
            <svg
              className="size-[1.2em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.73 21a2 2 0 0 1-3.46 0"
              />
            </svg>
          </button>
          <span className="text-xs">Requests</span>
        </Link>
      </div>
    )
  );
};

export default Footer;
