const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data/coffee.json");

// Read coffee data
function readCoffees() {
  const data = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

// Write coffee data
function writeCoffees(coffees) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(coffees, null, 2)
  );
}

// Get all coffees
const getCoffees = (req, res) => {
  try {
    const coffees = readCoffees();

    res.json(coffees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch coffees",
    });
  }
};

// Get one coffee
const getCoffeeById = (req, res) => {
  try {
    const coffees = readCoffees();

    const coffee = coffees.find(
      (item) => item.id === Number(req.params.id)
    );

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
const voteCoffee = (req, res) => {
  try {
    const coffees = readCoffees();

    const index = coffees.findIndex(
      (item) => item.id === Number(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Coffee not found",
      });
    }

    coffees[index].votes += 1;

    writeCoffees(coffees);

    res.json({
      message: "Vote recorded successfully",
      coffee: coffees[index],
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