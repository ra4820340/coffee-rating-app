const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const coffeeRoutes = require("./routes/coffeeRoutes");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Coffee Rating API is running!",
  });
});

// Coffee routes
app.use("/api/coffees", coffeeRoutes);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });