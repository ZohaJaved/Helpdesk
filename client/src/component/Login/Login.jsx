import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Login.css";
import Context from "../../context/roleContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [role, setRole] = useState("user");

  const { userType, setUserType } = useContext(Context);

  useEffect(() => {
    setErrors({});
  }, [email, password]);

  const navigate = useNavigate();

  //function to manage input
  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "role") setRole(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newError = {};
    if (!email || !password || !role) alert("All fields are required");
    if (email && password && validateInput()) {
      const submitData = {
        email,
        password,
        role,
      };
      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          email,
          password,
          role,
        });
        if (response.status === 200) {
          // Store user information in local storage
          console.log("response.data.token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          console.log("userType", userType);

          setUserType("Customer");
          alert("loggedin");
          //navigate to their respective homepage based on their roles
          if (role && role === "Admin") {
            console.log("userType", userType);
            {
              setUserType(role);
              navigate("/adminHome");
            }
          } else if (role && role === "Customer") {
            setUserType(role);
            navigate("/customerHome");
          } else {
            setUserType(role);
            navigate("/clientHome");
          }
        }
      } catch (error) {
        console.log(error.response.status);
        if (error.response && error.response.status === 401) {
          newError.password = "Password mismatch";
        } else if (error.response && error.response.status === 404) {
          newError.email = "User not found";
        } else if (error.response && error.response.status === 500) {
          alert("Internal server error,please try again letter");
        }
        console.log(newError);
        setErrors(newError);
      }
    }
  };

  const validateInput = () => {
    if (/\S+@\S+\.\S+/.test(email) && password.length >= 8) {
      return true;
    } else if (password.length <= 8) {
      errors.password = "password shold be minimum of 8 characters";
      setPassword("");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "enter valid emails";
      setEmail("");
    }
  };

  return (
    <>
      {" "}
      <Navbar
        showExtraLinks={false}
        showLogout={false}
        style={{ width: "100%", margin: "0" }}
      />{" "}
      <div className="container">
        {" "}
        <h2>Login</h2>{" "}
        <form className="form">
          {" "}
          <label className="label">
            {" "}
            Enter Email Address{" "}
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={email}
              onChange={handleChange}
              className="input"
            />{" "}
          </label>{" "}
          {errors.email && <span className="error">{errors.email}</span>}{" "}
          <label className="label">
            {" "}
            Enter Password{" "}
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={password}
              onChange={handleChange}
              className="input"
            />{" "}
          </label>{" "}
          {errors.password && <span className="error">{errors.password}</span>}{" "}
          <label className="label">
            {" "}
            Select Role{" "}
            <select
              name="role"
              value={role}
              onChange={handleChange}
              className="input"
            >
              {" "}
              <option value={undefined} selected>
                Select
              </option>{" "}
              <option value="Customer">Customer</option>{" "}
              <option value="Agent">Agent</option>{" "}
              <option value="Admin">Admin</option>{" "}
            </select>{" "}
          </label>{" "}
          {errors.role && <span className="error">{errors.role}</span>}{" "}
          <div className="buttonContainer">
            {" "}
            <button className="button" onClick={handleSubmit}>
              {" "}
              Log In{" "}
            </button>{" "}
          </div>{" "}
        </form>{" "}
        <p className="accountPrompt">
          {" "}
          Don't have an account? <a href="/Register">Sign up here</a>{" "}
        </p>{" "}
      </div>{" "}
    </>
  );
}
