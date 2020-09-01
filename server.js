// load .env data into process.env
require("dotenv").config();

// Web server config
const express     = require('express');
const app         = express();
const BodyParser = require('body-parser');
const ENV         = process.env.ENV || "development";
const PORT       = 8080;
const morgan     = require('morgan');
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

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Express Configuration
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
app.use(express.static('public'));

// CookieSession
app.use(cookieSession({
  name: 'session',
  cookie: {maxAge: 36000000, httpOnly: false},
  keys: ['thisismysuperlongstringtouseforcookiesessions', 'thisisasecondlongstring']
}));
// add req.session.user_id = user.id; to app.post login route

// Sample GET route
app.get('/', (req, res) => res.json({
  message: "Seems to work!",
}));

app.get("/test", (req, res) => {
  res.send("🤗");
});

// Separated Routes 
const homeRoutes = require('./routes/home');
const parksRoutes = require('./routes/parks');
const trailsRoutes = require('./routes/trails');
const visitorsRoutes = require('./routes/visitors');
const passRoutes = require('./routes/pass');
const mybookingsRoutes = require('./routes/mybookings');

// Mount all routes
app.use("/api",homeRoutes(db));
app.use("/api",trailsRoutes(db));
app.use("/api",parksRoutes(db));
app.use("/api",visitorsRoutes(db));
app.use("/api",passRoutes(db));
app.use("/api",mybookingsRoutes(db));


//Listening Port
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

