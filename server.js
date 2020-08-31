// load .env data into process.env
require("dotenv").config();

// Web server config
const express = require('express');
const app = express();
const BodyParser = require('body-parser');
const ENV  = process.env.ENV || "development";
const PORT = 8080;

const { Pool } = require('pg');

let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const db = new Pool(dbParams);

db.connect();

// db
//   .query(`SELECT *
//   FROM parks
//   JOIN trails ON park_id = parks.id
//   WHERE parks.id = 3;`)
//   .then(res => console.log(res.rows))
//   .catch(err => console.error('Error executing query', err.stack))


// Express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));

// Sample GET route
app.get('/', (req, res) => res.json({
  message: "Seems to work!",
}));

app.get("/test", (req, res) => {
  res.send("🤗");
});

// getting routes
const parksRoutes = require('./routes/parks');
//const parkRoute = require('./routes/park');
//const passesRoutes = require('./routes/')
// const trailsRoutes = require('./routes/trail');
// const visitorsRoutes = require('./routes/users');

app.use("/api",parksRoutes(db));
// App.use(parkRoute(db));
// App.use(trailsRoutes(db));
// App.use(visitorsRoutes(db));


app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

