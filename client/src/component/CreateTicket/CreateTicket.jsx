import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


function CreateTicket() {
  const [title, setTitle] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState();
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let validationErrors = {};
    if (!title) validationErrors.title = "Title is required";
    if (!customerName)
      validationErrors.customerName = "Customer Name is required";
    if (!email) {
      validationErrors.email = "Email is required";
    }
    return validationErrors;
  };

  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setEmail(decodedToken.email);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("errors", errors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/createTicket",
        { title, customerName, email, notes }
      );
      alert(response.data);
      setTitle("");
      setCustomerName("");
      setNotes("");
    } catch (error) {
      console.error("Error creating ticket:", error.message);
    }
  };

  return (
    <center>
      <div>
        <h2>Create New Ticket</h2>
        <form>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {errors.title && <span style={{ color: "red" }}>{errors.title}</span>}
          <label>
            Customer Name:
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </label>
          {errors.customerName && (
            <span style={{ color: "red" }}>{errors.customerName}</span>
          )}
          {/* <label>
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label> */}
          <label>
            Additional Notes (Optional):{" "}
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </label>
          <button onClick={(event) => handleSubmit(event)}>
            Create Ticket
          </button>
        </form>
      </div>
    </center>
  );
}

export default CreateTicket;
