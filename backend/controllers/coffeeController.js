const Coffee = require("../models/Coffee");

// Get all coffees
const getCoffees = async (req, res) => {
  try {
    const coffees = await Coffee.find().sort({ id: 1 });

    res.json(coffees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch coffees",
    });
  }
};

// Get one coffee
const getCoffeeById = async (req, res) => {
  try {
    const coffee = await Coffee.findOne({
      id: Number(req.params.id),
    });

    if (!coffee) {
      return res.status(404).json({
        message: "Coffee not found",
      });
    }

    res.json(coffee);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch coffee",
    });
  }
};

// Vote for coffee
const voteCoffee = async (req, res) => {
  try {
    const coffee = await Coffee.findOneAndUpdate(
      { id: Number(req.params.id) },
      { $inc: { votes: 1 } },
      { new: true }
    );

    if (!coffee) {
      return res.status(404).json({
        message: "Coffee not found",
      });
    }

    res.json({
      message: "Vote recorded successfully",
      coffee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to record vote",
    });
  }
};

module.exports = {
  getCoffees,
  getCoffeeById,
  voteCoffee,
};