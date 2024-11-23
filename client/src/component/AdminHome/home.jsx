import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import axios from "axios";
import "./home.css";

const HomePage = () => {
  const [numOFTickets, setNumOfTickets] = useState(0);
  const [numOFcustomers, setNumOfCustomers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsResponse = await axios.get(
          "http://localhost:5000/count/totalTicketsCount"
        );
        const customersResponse = await axios.get(
          "http://localhost:5000/count/customerCount"
        );
        setNumOfTickets(ticketsResponse.data.count);
        setNumOfCustomers(customersResponse.data.count);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container" >
      {" "}
      {/* <Navbar /> */} <h1>Welcome to the Helpdesk Application</h1>{" "}
      <div className="stats">
        {" "}
        <div className="stat-box">
          {" "}
          <h2>Total Tickets: {numOFTickets}</h2>{" "}
        </div>{" "}
        <div className="stat-box">
          {" "}
          <h2>Total Customers: {numOFcustomers}</h2>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default HomePage;
