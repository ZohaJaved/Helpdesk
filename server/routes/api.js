import express, { text } from "express";
import Ticket from "../models/TicketModel.js";
import authenticateToken from "../middleware/authorizationToken.js"

const router = express.Router();

router.post("/createTicket", async (req, res) => {
  const { title, customerName, email, notes } = req.body;
  console.log("req.body", req.body);
  try {
    const newTicket = new Ticket({
      title,
      customerName,
      email,
      notes: notes ? [{ text: notes, addedBy: email }] : [],
    });
    newTicket.save();
    res.status(200).json("Ticket Created Successfully");
  } catch (error) {
    res.status(400).json("error while saving", error.message);
  }
});

router.get("/ticketList",authenticateToken, async (req, res) => {
  try {
    let tickets;
    if(req.user.role==='Customer'){
      tickets=await Ticket.find({email:req.user.email}).sort({lastUpdatedOn:-1})
      console.log("customer",tickets)
    }
    else{
      tickets=await Ticket.find().sort({lastUpdatedOn:-1});
      console.log("non customer",tickets)
    }
    res.status(200).json(tickets);
  } catch (error) {
    console.log(error);
  }
});

// Endpoint to add a note to a ticket
router.post("/tickets/:ticketId/addNote", async (req, res) => {
  const { ticketId } = req.params;
  const { text, addedBy } = req.body;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    // Add the new note to the ticket's notes array
    ticket.notes.push({ text, addedBy, time: new Date() });
    ticket.lastUpdatedOn = new Date();
    await ticket.save();
    console.log("ticket", ticket);
    res.status(200).json({ message: "Note added successfully", ticket });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint to update ticket status
router.patch("/tickets/:ticketId/status", async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;
  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    ticket.status = status;
    ticket.lastUpdatedOn = new Date();
    await ticket.save();
    res
      .status(200)
      .json({ message: "Ticket status updated successfully", ticket });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
