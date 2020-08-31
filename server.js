// load .env data into process.env
require("dotenv").config();

// Web server config
const express     = require('express');
const app         = express();
const BodyParser = require('body-parser');
const ENV         = process.env.ENV || "development";
const PORT       = 8080;
const cookieSession = require('cookie-session');

// PG database client/connection setup
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


app.use(cookieSession({
  name: 'session',
  cookie: {maxAge: 36000000, httpOnly: false},
  keys: ['thisismysuperlongstringtouseforcookiesessions', 'thisisasecondlongstring']
}));
// add req.session.user_id = user.id; to app.post login route






app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

