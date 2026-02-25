const express = require("express");
const CV = require("../models/CV");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/*
CREATE CV
POST /api/cv
*/
router.post("/", protect, async (req, res) => {
  try {
    const cv = await CV.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
GET MY CVS
GET /api/cv
*/
router.get("/", protect, async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user._id });
    res.json(cvs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
GET SINGLE CV
GET /api/cv/:id
*/
router.get("/:id", protect, async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv || cv.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
UPDATE CV
PUT /api/cv/:id
*/
router.put("/:id", protect, async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv || cv.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "CV not found" });
    }

    Object.assign(cv, req.body);
    await cv.save();

    res.json(cv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
DELETE CV
DELETE /api/cv/:id
*/
router.delete("/:id", protect, async (req, res) => {
  try {
    const cv = await CV.findById(req.params.id);

    if (!cv || cv.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "CV not found" });
    }

    await cv.deleteOne();

    res.json({ message: "CV deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;