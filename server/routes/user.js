import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Get all userDetails
router.get("/getUsersDetail", async (req, res) => {
  console.log("/getUserDetails");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new user
router.post("/createNewProfile", async (req, res) => {
  console.log("req.body", req.body);
  const { username, email, role } = req.body;
  try {
    const newUser = new User({ username, email, role });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update user details
router.put("/updateUserDetails/:userId", async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to delete a user by ID
router.delete("/deleteUserAccount/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
