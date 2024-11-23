import React, { useState, useEffect } from "react";
import axios from "axios";
import Register from "../Register/Register";
import "./AccountManagement.css"

function AccountManagement() {
  const [userDetails, setUserDetails] = useState([]);
  const [editingUser, setEditingUser] = useState();
  const [updateDisplay, setUpdateDisplay] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/getUsersDetail"
        );
        console.log("userDetails", response.data);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [editingUser, updateDisplay]);

  const handleUpdateUserAccount = async (event, updatedUser) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/users/updateUserDetails/${updatedUser._id}`,
        updatedUser
      );
      console.log("response.data", response.data);
      setUserDetails(
        userDetails.map((user) =>
          user._id === updatedUser._id ? response.data.user : user
        )
      );
      setEditingUser(null);
      alert("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUserAccount = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/users/deleteUserAccount/${userId}`
      );
      setUserDetails(userDetails.filter((user) => user._id !== userId));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="account-management-container">
      {" "}
      <div style={{display:'flex' ,justifyContent:'center',alignItems:'center'}}><h2 style={{color:'black'}}>User Management</h2>{" "}</div>
      <Register
        adminRegister={true}
        updateDisplay={updateDisplay}
        setUpdateDisplay={setUpdateDisplay}
      />{" "}
      <div style={{display:'flex' ,justifyContent:'center',alignItems:'center'}}><h3>List of users</h3>{" "}</div>
      <ul>
        {" "}
        {userDetails &&
          userDetails.map((user) => (
            <li key={user._id}>
              {" "}
              {editingUser && editingUser._id === user._id ? (
                <form
                  onSubmit={(event) =>
                    handleUpdateUserAccount(event, editingUser)
                  }
                >
                  {" "}
                  <span className="form-title">
                    Modify Details of {editingUser.customerName}
                  </span>{" "}
                  <label>
                    {" "}
                    Enter Full Name{" "}
                    <input
                      type="text"
                      name="name"
                      value={editingUser.customerName}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          customerName: e.target.value,
                        })
                      }
                      placeholder="Username"
                      required
                    />{" "}
                  </label>{" "}
                  <label>
                    {" "}
                    Email Address{" "}
                    <input
                      type="email"
                      name="email"
                      value={editingUser.email}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          email: e.target.value,
                        })
                      }
                      placeholder="Email"
                      required
                    />{" "}
                  </label>{" "}
                  <label>
                    {" "}
                    Phone Number{" "}
                    <input
                      type="number"
                      name="phoneNumber"
                      value={editingUser.phoneNumber}
                      onChange={(e) =>
                        setEditingUser({
                          ...editingUser,
                          phoneNumber: e.target.value,
                        })
                      }
                      placeholder="Contact Number"
                      required
                    />{" "}
                  </label>{" "}
                  <label>
                    {" "}
                    Role{" "}
                    <select
                      name="role"
                      value={editingUser.role}
                      onChange={(e) =>
                        setEditingUser({ ...editingUser, role: e.target.value })
                      }
                    >
                      {" "}
                      <option value="Customer">Customer</option>{" "}
                      <option value="Agent">Agent</option>{" "}
                      <option value="Admin">Admin</option>{" "}
                    </select>{" "}
                  </label>{" "}
                  <button type="submit">Update User</button>{" "}
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setEditingUser(null)}
                  >
                    {" "}
                    Cancel{" "}
                  </button>{" "}
                </form>
              ) : (
                <>
                  {" "}
                  <p>Username: {user.customerName}</p>{" "}
                  <p>Email: {user.email}</p> <p>Role: {user.role}</p>{" "}
                  <button onClick={() => setEditingUser(user)}>Edit</button>{" "}
                  <button
                    className="cancel-button"
                    onClick={() => handleDeleteUserAccount(user._id)}
                  >
                    {" "}
                    Delete{" "}
                  </button>{" "}
                </>
              )}{" "}
            </li>
          ))}{" "}
      </ul>{" "}
    </div>
  );
}

export default AccountManagement;
