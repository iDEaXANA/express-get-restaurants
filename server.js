const app = require("./src/app");
const db = require("./db/connection");
const syncSeed = require("./seed");
const port = 3000;

//TODO: Create your GET Request Route Below:

app.listen(port, async () => {
  await syncSeed();
  console.log(`Listening at http://localhost:${port}/restaurants`);
});
