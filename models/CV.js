const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  personalInfo: {
    fullName: String,
    email: String,
    phone: String,
    location: String,
    summary: String
  },

  education: [
    {
      institution: String,
      degree: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],

  experience: [
    {
      company: String,
      position: String,
      startDate: String,
      endDate: String,
      description: String
    }
  ],

  skills: [String]

}, { timestamps: true });

module.exports = mongoose.model("CV", cvSchema);