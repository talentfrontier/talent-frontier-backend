const express = require("express");
const protect = require("../middleware/authMiddleware");
const Application = require("../models/Application");
const Job = require("../models/Job");
const CV = require("../models/CV");

const router = express.Router();

/*
APPLY TO JOB
POST /api/applications
*/
router.post("/", protect, async (req, res) => {
  try {
    const { jobId, cvId } = req.body;

    const job = await Job.findById(jobId);
    const cv = await CV.findById(cvId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (!cv || cv.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "CV not found" });
    }

    const alreadyApplied = await Application.findOne({
      user: req.user._id,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    const application = await Application.create({
      user: req.user._id,
      job: jobId,
      cv: cvId,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
GET MY APPLICATIONS
GET /api/applications
*/
router.get("/", protect, async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user._id })
      .populate("job")
      .populate("cv");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;