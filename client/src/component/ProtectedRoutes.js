import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import SideMenu from "./Sidemenu/Sidemenu";
import Navbar from "./Navbar/Navbar";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? (<>
    <Navbar showLogout={true}/>
    <div className="app-container" style={{ height: "100vh" }}>
       <SideMenu style={{ height: "100vh" }} />
      <div className="main-content">{children}</div>
    </div>
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
