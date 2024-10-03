import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/MainPage";
import OEE from "./pages/OEE";
import OEEMachine from "./pages/OEEMachine";
import { MainContent, RouterContainer } from "./Routers.styled";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound";

const Router = () => {
  const auth = true;

  return (
    <RouterContainer>
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
              <Route path="/home" element={<MainPage />} />
              <Route path="/indicadores" element={<OEE />} />
              <Route path="/OEE/machine/:id" element={<OEEMachine />} />
            </>
          )}
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </MainContent>
    </RouterContainer>
  );
};

export default Router;
