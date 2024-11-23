import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    customerName:{type:String,required:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Customer', 'Agent', 'Admin'], default: 'Customer' },
    phoneNumber:{type:Number,required:false},
    createdTime:{type:Date,default:Date.now}
  });

const User=mongoose.model('User',userSchema);

export default User;