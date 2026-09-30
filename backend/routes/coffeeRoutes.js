const express = require("express");

const {
  getCoffees,
  getCoffeeById,
  voteCoffee,
} = require("../controllers/coffeeController");

const router = express.Router();

// GET all coffees
router.get("/", getCoffees);

// GET one coffee
router.get("/:id", getCoffeeById);

// POST vote
router.post("/:id/vote", voteCoffee);

module.exports = router;