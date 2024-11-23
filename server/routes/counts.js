import express from "express";
import User from "../models/User.js";
import Ticket from "../models/TicketModel.js";

const router=express.Router();

// api to get the count of tickets
router.get("/totalTicketsCount", async (req, res) => {
  try {
    const count = await Ticket.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching ticket count" });
  }
});

// api to get the count of tickets status wise
router.get("/ticketStatusCount", async (req, res) => {
  console.log("/ticketStatusCount")
  try {
    const activeCount = (await Ticket.find({status:'Active'})).length;
    const pendingCount=(await Ticket.find({status:'Pending'})).length;
    const closedCount=(await Ticket.find({status:'Closed'})).length;
    const statusCount={activeCount,pendingCount,closedCount};
    console.log("count",statusCount);
    res.json({ statusCount });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching ticket count" });
  }
});


// Api to get the count of users (customers)
router.get("/customerCount", async (req, res) => {
  try {
    const users=await User.find({role:'Customer'})
    const count=users.length
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: "Error fetching user count" });
  }
});


export default router;
