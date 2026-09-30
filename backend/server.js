const express = require("express");
const cors = require("cors");

const coffeeRoutes = require("./routes/coffeeRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Coffee Rating API is running!",
  });
});

app.use("/api/coffees", coffeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});