const mongoose = require("mongoose");
require("dotenv").config();

const Coffee = require("./models/Coffee");
const coffeeData = require("./data/coffee.json");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Coffee.deleteMany({});

    await Coffee.insertMany(coffeeData);

    console.log(
      `${coffeeData.length} coffee records inserted successfully`
    );

    await mongoose.disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();