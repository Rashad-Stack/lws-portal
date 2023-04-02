import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import brandImage from "../../assets/image/learningportal.svg";
import { authSelector } from "../../features/auth/authSlice";
import Logout from "./Logout";

export default function Navbar() {
  const { user } = useSelector(authSelector);

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/">
          <img className="h-10" src={brandImage} />
        </Link>
        <div className="flex items-center gap-3">
          {user.role === "student" && (
            <Link to="/leaderboard">Leaderboard</Link>
          )}
          <h2 className="font-bold">{user?.name}</h2>
          <Logout />
        </div>
      </div>
    </nav>
  );
}
