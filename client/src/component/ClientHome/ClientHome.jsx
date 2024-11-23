import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar.jsx";
import axios from 'axios';

const ClientHome = () => {
    const [numOFTickets, setNumOfTickets] = useState(0);
    const [statusCount,setStatusCount]=useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ticketsResponse = await axios.get('http://localhost:5000/count/totalTicketsCount'); 
                const ticketStatusCount=await axios.get('http://localhost:5000/count/ticketStatusCount')
                setNumOfTickets(ticketsResponse.data.count);
                setStatusCount(ticketStatusCount.data.statusCount)
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div>
            {/* <Navbar /> */}
            <h1>Welcome to the Helpdesk Application</h1>
            <div>
                <h2>Total Tickets:{""}{numOFTickets}</h2>
                <p>Active Tickets:{""}{statusCount.activeCount}</p>
                <p>Pending Tickets:{""}{statusCount.pendingCount}</p>
                <p>Closed Tickets:{""}{statusCount.closedCount}</p>
            </div>
        </div>
    );
};

export default ClientHome;
