const request = require("supertest");
const app = require("./src/app");
const seedData = require("./seedData");
const Restaurant = require("./models");
const syncSeed = require("./seed.js"); // makes sure database is reset after each test!
let restQuantity;

beforeAll(async () => {
  await syncSeed();
  const restaurants = await Restaurant.findAll({});
  restQuantity = restaurants.length;
});

describe("GET /restaurants", () => {
  test("1. GET /restaurants returns status 200", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.statusCode).toEqual(200);
  });
  test("2. GET /restaurants returns an array of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    //expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((restaurant) => {
      expect(restaurant).toHaveProperty("name");
      expect(restaurant).toHaveProperty("cuisine");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  test("3. GET /restaurants returns correct number of restaurants", async () => {
    const response = await request(app).get("/restaurants");
    const numberOfRestaurants = response.body.length;
    expect(numberOfRestaurants).toEqual(restQuantity);
  });

  test("4. GET /restaurants returns correct restaurant data", async () => {
    const response = await request(app).get("/restaurants");
    expect(response.body).toContainEqual(
      expect.objectContaining({
        id: 1,
        name: "AppleBees",
        location: "Texas",
        cuisine: "FastFood",
      })
    );
  });

  test("5. GET /restaurants/:id returns correct data", async () => {
    const response = await request(app).get("/restaurants/1");
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        name: "AppleBees",
        location: "Texas",
        cuisine: "FastFood",
      })
    );
  });
});

describe("POST /restaurants", () => {
  test("6. Returns restaurant array with updated value", async () => {
    const newRestaurantData = {
      name: "Bilalgers Galore",
      location: "New Yawk",
      cuisine: "Dessert Burgers",
    };
    const response = await request(app)
      .post("/restaurants")
      .send(newRestaurantData);

    expect(response.body.length).toEqual(restQuantity + 1);
  });
});

describe("PUT /restaurants/:id", () => {
  test("7. Updates the restaurant array with the provided id", async () => {
    const newRestaurantData = {
      name: "Bilalgers Galore",
      location: "New Yawk",
      cuisine: "Dessert Burgers",
    };
    await request(app).put("/restaurants/1").send(newRestaurantData);
    const restaurant = await Restaurant.findByPk(1);
    expect(restaurant.name).toEqual("Bilalgers Galore");
  });
});

describe("DELETE /restaurants/:id", () => {
  test("8. Updates the restaurant array with the provided id", async () => {
    await request(app).delete("/restaurants/1");
    const restaurants = await Restaurant.findAll({});
    expect(restaurants.length).toEqual(restQuantity);
    expect(restaurants[0].id).not.toEqual(1);
  });
});