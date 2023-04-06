import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { authSelector, userLoggedOut } from "../../features/auth/authSlice";

export default function Logout() {
  const { user } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(userLoggedOut());
    navigate("/student/login");
  };

  const { pathname } = useLocation();

  // Decide When warn to log out
  const warnLogout = user?.role === "admin" || pathname === "/quiz";

  // Deciding logout button for admin
  const isAdmin = warnLogout
    ? "flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium"
    : "flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan";

  return (
    <button className={isAdmin} onClick={handleLogout}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
        />
      </svg>
      Logout
    </button>
  );
}
