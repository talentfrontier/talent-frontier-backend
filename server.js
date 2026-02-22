const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const jobsRoutes = require("./routes/jobs");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Talent Frontier Backend Running 🚀");
});

app.use("/api/jobs", jobsRoutes);

// ✅ DATABASE CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});