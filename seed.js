const { Restaurant, Menu, Item } = require("./models/index");
const { seedRestaurant, seedItem, seedMenu } = require("./seedData");
const db = require("./db/connection");

// const syncSeed = async () => {
//   await db.sync({ force: true });
//   await Restaurant.bulkCreate(seedRestaurant);
//   await Menu.bulkCreate(seedMenu);
//   await Item.bulkCreate(seedItem);
// };

const syncSeed = async () => {
  try {
    console.log("Dropping and recreating tables...");
    await db.sync({ force: true });

    console.log("Seeding restaurants...");
    await Restaurant.bulkCreate(seedRestaurant);

    console.log("Seeding menus...");
    await Menu.bulkCreate(seedMenu);

    console.log("Seeding items...");
    await Item.bulkCreate(seedItem);

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the database connection when done
    await db.close();
  }
};

syncSeed();

module.exports = syncSeed;
