import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddNote.css";

function AddNote(props) {
  const { ticketId, handleToggleAddNote, refreshTickets, role } = props;
  const [text, setText] = useState("");
  const [email, setEmail] = useState();
  const [addedBy, setAddedBy] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    if (parsedUser) {
      console.log("user==", user);
      setEmail(parsedUser.email);
      setAddedBy(parsedUser.customerName);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("addNote", addedBy, email);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/tickets/${ticketId}/addNote`,
        {
          text,
          addedBy: `${addedBy}(${email})|${role}`,
        }
      );
      alert("Note added successfully");
      setText("");
      refreshTickets();
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-note-form">
      {" "}
      <label>
        {" "}
        Note:{" "}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />{" "}
      </label>{" "}
      <button type="submit">Add Note</button>{" "}
      <button
        type="button"
        className="cancel-button"
        onClick={() => handleToggleAddNote(ticketId)}
      >
        Cancel
      </button>{" "}
    </form>
  );
}

export default AddNote;
