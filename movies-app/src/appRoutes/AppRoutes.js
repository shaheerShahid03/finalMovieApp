import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Home from "../pages/Home";
import LoginPage from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
    </Routes>
  );
}
