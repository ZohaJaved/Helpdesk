import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AddNote from "../AddNote/AddNote";
import Context from "../../context/roleContext";
import "./TicketList.css"

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [showAddNote, setShowAddNote] = useState({});
  const [updateDisplay, setUpdateDisplay] = useState(true);
  const { userType,setUserType, email } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      const parsedUser = JSON.parse(user);
      console.log("active user name",user)
    }
  }, [setUserType]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/ticketList",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("tickets", response.data);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, [updateDisplay]);

  const handleToggleAddNote = (id) => {
    setShowAddNote((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const refreshTickets = () => {
    setUpdateDisplay(!updateDisplay);
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tickets/${ticketId}/status`,
        { status: newStatus }
      );
      refreshTickets(); // Refresh the tickets to reflect the updated status
      alert("status changed");
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  if (!tickets) {
    return <h1>Loading...</h1>;
  }
  if (tickets && tickets < 1) {
    return <h1>No ticket found...</h1>;
  }

  return (
    <div className="ticket-list-container">
      {" "}
      <div style={{display:'flex' ,justifyContent:'center',alignItems:'center'}}><h2>Tickets</h2>{" "}</div>{" "}
      <ul className="ticket-list">
        {" "}
        {tickets.map((ticket) => (
          <li key={ticket._id} className="ticket-item">
            {" "}
            <h3>Title:{ticket.title}</h3> <p>Current status: {ticket.status}</p>{" "}
            {userType && userType !== "Customer" && (
              <div className="status-select">
                {" "}
                <label>
                  {" "}
                  Change status:{" "}
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      handleStatusChange(ticket._id, e.target.value)
                    }
                  >
                    {" "}
                    <option value="Pending">Pending</option>{" "}
                    <option value="Active">Active</option>{" "}
                    <option value="Closed">Closed</option>{" "}
                  </select>{" "}
                </label>{" "}
              </div>
            )}{" "}
            <p>Customer: {ticket.customerName}</p> <p>Email: {ticket.email}</p>{" "}
            <h4>Notes:</h4>{" "}
            <ul className="notes-list">
              {" "}
              {ticket.notes.map((note, index) => (
                <li key={index} className="notes-item">
                  {" "}
                  <p>{note.text}</p>{" "}
                  <p className="note-meta">Added by: {note.addedBy}</p>{" "}
                  <p className="note-meta">
                    Time: {new Date(note.time).toLocaleString()}
                  </p>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
            {showAddNote[ticket._id] ? (
              <AddNote
                ticketId={ticket._id}
                addedBy={ticket.customerName}
                refreshTickets={refreshTickets}
                handleToggleAddNote={handleToggleAddNote}
                role={userType}
              />
            ) : (
              <button onClick={() => handleToggleAddNote(ticket._id)}>
                {" "}
                Add Note{" "}
              </button>
            )}{" "}
          </li>
        ))}{" "}
      </ul>{" "}
    </div>
  );
}

export default TicketList;
