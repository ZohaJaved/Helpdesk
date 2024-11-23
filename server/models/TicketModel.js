import { Timestamp } from "bson";
import mongoose from "mongoose";
import { type } from "os";

const ticketSchema=new mongoose.Schema({
    title:{type:String,required:true},
    status:{type:String,enum:['Active','Pending','Closed'],default:'Pending'},
    customerName:{type:String,required:true},
    email:{type:String,required:true},
    notes:[{text:String,addedBy:String,time:{type:Date,default:Date.now}}],
    lastUpdatedOn:{type:Date,default:Date.now}
});

const Ticket=mongoose.model('Ticket',ticketSchema);

export default Ticket;