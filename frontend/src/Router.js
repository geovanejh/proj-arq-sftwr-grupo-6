import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OEE from "./pages/OEE";
import OEEMachine from "./pages/OEEMachine";
import { MainContent, RouterContainer } from "./Routers.styled";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound";
import { AuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

const Router = () => {
  const { auth } = useContext(AuthContext);

  return (
    <RouterContainer>
      <Toaster />
      {auth && <Header />}
      <MainContent auth={auth}>
        <Routes>
          {!auth ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/indicadores" element={<OEE />} />
              <Route path="/indicadores/machine/:id" element={<OEEMachine />} />
            </>
          )}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </MainContent>
    </RouterContainer>
  );
};

export default Router;
