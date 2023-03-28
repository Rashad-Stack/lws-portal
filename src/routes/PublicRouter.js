import { Outlet, Navigate } from "react-router-dom";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function PublicRouter() {
  const isLoggedIn = useAuth();
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
}
