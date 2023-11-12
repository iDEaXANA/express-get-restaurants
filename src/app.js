const express = require("express");
const app = express();
const { Restaurant, Menu, Item } = require("../models/index");
const db = require("../db/connection");
const { check, validationResult } = require("express-validator");

//TODO: Create your GET Request Route Below:

// app.get("/restaurants", async (request, response) => {
//   const restaurantList = await Restaurant.findAll();
//   response.json(restaurantList);
// });

// app.get("/restaurants/:id", async (req, res) => {
//   const id = req.params.id;
//   const foundRestaurant = await Restaurant.findByPk(id);
//   res.json(foundRestaurant);
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll({});
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurants = await Restaurant.findByPk(req.params.id);
  res.json(restaurants);
});

app.post(
  "/restaurants",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name cannot be empty")
      .custom((value) => !/\s/.test(value))
      .withMessage("Name cannot contain whitespace"),
    check("location")
      .not()
      .isEmpty()
      .custom((value) => !/\s/.test(value)),
    check("cuisine")
      .not()
      .isEmpty()
      .custom((value) => !/\s/.test(value)),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.json({ error: errors.array() });
    } else {
      const restaurant = await Restaurant.create(req.body);
      const restaurants = await Restaurant.findAll({});
      res.json(restaurants);
    }
  }
);

app.put("/restaurants/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.update(req.body, {
    where: { id: req.params.id },
  });
  const restaurant = await Restaurant.findAll({});
  res.json(restaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurantToRemove = await Restaurant.destroy({ where: { id: id } });
  res.json(restaurantToRemove);
});

module.exports = app;
