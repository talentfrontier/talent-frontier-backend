const express = require("express");
const Job = require("../models/Job");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

/*
CREATE JOB
POST /api/jobs
*/
router.post("/", protect, authorize("employer", "admin"), async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      jobType,
      salaryRange,
      description,
      requirements
    } = req.body;

    const job = await Job.create({
      title,
      companyName,
      location,
      jobType,
      salaryRange,
      description,
      requirements,
      employer: req.user._id
    });

    res.status(201).json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
GET ALL JOBS
GET /api/jobs
*/
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" })
      .populate("employer", "name email");

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
GET SINGLE JOB
GET /api/jobs/:id
*/
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate("employer", "name email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;