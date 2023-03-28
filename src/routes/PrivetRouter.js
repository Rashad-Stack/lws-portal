import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function PrivetRouter() {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/student/login" />;
}
