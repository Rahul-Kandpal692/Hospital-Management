import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First Name must contain atleast 3 Characters"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last Name must contain atleast 3 Characters"]
    },
    email:{
        type:String,
        required:true,
        validate: [validator.isEmail,"Please provide a valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone number must contain exact 10 digits"],
        maxLength:[10,"Phone number must contain exact 10 digits"]
    },
    message:{
        type:String,
        required:true,
        minLength:[3,"Message must contain atleast 3 Characters"]
    }
});

export const Message=mongoose.model("Message",messageSchema);