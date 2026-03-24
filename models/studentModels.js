// import mongoose
const mongoose = require("mongoose")

// create schema for Student
const studentSchema = new mongoose.Schema({


  name: {
    type: String,
    required: true,   
    trim: true        
  },

  // student email
  email: {
    type: String,
    required: true,
    unique: true,    
    lowercase: true,  
    trim: true
  },

  // student class
  className: {
    type: String,
    required: true
  },

  // phone number
  phone: {
    type: String,
    required: true,
    trim: true
  },

  // total course fee
  totalFee: {
    type: Number,
    required: true
  },

  // amount already paid
  paidAmount: {
    type: Number,
    required: true,
    default: 0
  },
  dueAmount:{
         type:Number
  },
  status:{
    type:String,
    default:"pending"
  },

  // image filename stored locally
  image: {
    type: String,
    default: null
  },
  password:{
    type:String,
    required:true,
   
    select:false
  }

}, {
  timestamps: true 
})

// export mongoose model
module.exports = mongoose.model("Student", studentSchema)