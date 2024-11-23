import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const submitData = req.body.submitData;
  const {email,password,customerName,phoneNumber,role}=submitData;
  console.log("/register",submitData);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email: email.toLowerCase(), password: hashedPassword,customerName,phoneNumber,role });
    await user.save();

    res.status(200).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password,role } = req.body;
  console.log("req.body",req.body)

  if (!email || !password||!role) {
    return res.status(400).json({ message: 'Email,password and role are required.' });
  }

  try {
    const caseInsensitiveEmail = email.toLowerCase();
    const user = await User.findOne({ email: caseInsensitiveEmail,role });
 
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email :user.email,userName:user.customerName },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );
    console.log("generatedToken",process.env.JWT_SECRET)

    res.status(200).json({ token,user });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
});

export default router;
