import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [role, setRole] = useState(undefined);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
    console.log("Register component rendered");
    console.log("props", props);
  }, [name, email, password, confirmPassword, phoneNumber]);

  //function to handle input
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
    if (name === "phoneNumber") setPhoneNumber(value);
    if (name === "role") setRole(value);
  };

  //function to validate form
  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Name is required.";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }
    if (!email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters long.";
    else if (!/\d/.test(password))
      newErrors.password = "Password must contain at least one number.";
    else if (!/[!@#$%^&*]/.test(password))
      newErrors.password =
        "Password must contain at least one special character.";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone number is required.";
    else if (!/^\d{10}$/.test(phoneNumber))
      newErrors.phoneNumber = "Phone number is invalid.";
    if (props.adminRegister && role === undefined)
      newErrors.role = "chose role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //function to submit from
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {};

    if (validateForm()) {
      const submitData = {
        customerName: name,
        email,
        password,
        phoneNumber,
        role,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/auth/register",
          {
            submitData,
          }
        );
        console.log(
          "form submitted",
          props.updateDisplay,
          props.setUpdateDisplay
        );

        if (response.status === 200) {
          console.log("Registered Successful", response.data);
          alert("Register successfull");
          setName("");
          setEmail("");
          setConfirmPassword("");
          setPassword("");
          setPhoneNumber("");

          await props.setUpdateDisplay(!props.updateDisplay);
          console.log("setUpdate Display", props.setUpdateDisplay);
          {
            !props.adminRegister && navigate("/");
          }
        }
      } catch (error) {
        if (error.status === 409) {
          newErrors.userExist = "User already exist";
          setErrors(newErrors);
        }
        console.log(error);
      }
    }
  };

  return (
    <div>
      {" "}
      {!props.adminRegister && (
        <Navbar showExtraLinks={false} showLogout={false} />
      )}{" "}
      <div className="container">
        {" "}
        <div className="register-head">
          {" "}
          {!props.adminRegister && <h1>Register</h1>}{" "}
        </div>{" "}
        <form className="form">
          {" "}
          <label className="label">
            {" "}
            Enter Full Name{" "}
            <input
              type="text"
              placeholder="Enter Full Name"
              name="name"
              value={name}
              onChange={handleChange}
              className="input"
            />{" "}
          </label>{" "}
          {errors.name && <span className="error">{errors.name}</span>}{" "}
          <label className="label">
            {" "}
            Email Address{" "}
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
              maxLength={15}
              onChange={handleChange}
              className="input"
              required
            />{" "}
          </label>{" "}
          {errors.password && <span className="error">{errors.password}</span>}{" "}
          <label className="label">
            {" "}
            Confirm Password{" "}
            <input
              type="password"
              placeholder="Re Enter Password"
              name="confirmPassword"
              value={confirmPassword}
              maxLength={15}
              onChange={handleChange}
              className="input"
              required
            />{" "}
          </label>{" "}
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}{" "}
          <label className="label">
            {" "}
            Enter Phone Number{" "}
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              className="input"
            />{" "}
          </label>{" "}
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}{" "}
          {props.adminRegister && (
            <>
              {" "}
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
            </>
          )}{" "}
          <div className="buttonContainer">
            {" "}
            <button className="button" onClick={handleSubmit}>
              {" "}
              Register{" "}
            </button>{" "}
          </div>{" "}
          {errors.userExist && (
            <span className="error">{errors.userExist}</span>
          )}{" "}
          {!props.adminRegister && (
            <p className="accountPrompt">
              {" "}
              Already Have an account? <a href="/">Login here</a>{" "}
            </p>
          )}{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
}
