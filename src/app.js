const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

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

app.post("/resturants", async (req, res) => {
  const restaurant = await Restaurant.create(req.body);
  res.json(restaurant);
});

app.put("/restaurants/:id", async (req, res) => {
  const updatedRestaurant = await Restaurant.update(req.body, {
    where: { id: req.params.id },
  });
  res.json(updatedRestaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const resturantToRemove = await Restaurant.destroy({ where: { id: id } });
  res.json(resturantToRemove);
});

module.exports = app;
