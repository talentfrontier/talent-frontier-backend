const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    required: true
  },
  salaryRange: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String]
  },
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  }
}, { timestamps: true });

module.exports = mongoose.model("Job", jobSchema);