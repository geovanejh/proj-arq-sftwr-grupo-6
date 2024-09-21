import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import OEE from "./pages/OEE";
import OEEMachine from "./pages/OEEMachine";

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<MainPage />} />
      <Route path="/OEE" element={<OEE />} />
      <Route path="/OEE/machine/:id" element={<OEEMachine />} />
    </Routes>
  );
};

export default Router;
