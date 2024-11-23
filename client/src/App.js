import "./App.css";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import Context from "./context/roleContext";
import Login from "./component/Login/Login.jsx";
import Register from "./component/Register/Register.jsx";
import UserHome from "./component/UserHomePage/HomeUser.jsx";
import AdminHome from "./component/AdminHome/home.jsx";
import ClientHome from "./component/ClientHome/ClientHome.jsx";
import CreateTicket from "./component/CreateTicket/CreateTicket.jsx";
import TicketList from "./component/TicketList/TicketList.jsx";
import AccountManagement from "./component/AccountManagement/AccountManagement.jsx";
import ProtectedRoute from "./component/ProtectedRoutes.js";

function App() {
  const { setUserType } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      const parsedUser = JSON.parse(user);
      setUserType(parsedUser.role);
      // navigate(`/${parsedUser.role.toLowerCase()}Home`);
    }
  }, [setUserType, navigate]);

  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register adminRegister={false} />} />
        <Route path="/customerHome" element={<ProtectedRoute><UserHome /></ProtectedRoute>} />
        <Route path="/adminHome" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />
        <Route path="/clientHome" element={<ProtectedRoute><ClientHome /></ProtectedRoute>} />
        <Route path="/createTicket" element={<ProtectedRoute><CreateTicket /></ProtectedRoute>} />
        <Route path="/ticketList" element={<ProtectedRoute><TicketList /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><AccountManagement /></ProtectedRoute>} />
      </Routes>
  );
}

export default App;
