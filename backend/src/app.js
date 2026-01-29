const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const consoleRoutes = require("./routes/consoleRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/db-status", (req, res) => {
  res.json({ mongoState: mongoose.connection.readyState }); // 1 = connected
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Console Rental API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/consoles", consoleRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
