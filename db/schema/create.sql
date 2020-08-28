DROP TABLE IF EXISTS parks CASCADE;
DROP TABLE IF EXISTS trails CASCADE;
DROP TABLE IF EXISTS passes CASCADE;
DROP TABLE IF EXISTS visitors CASCADE;
DROP TABLE IF EXISTS pass_entries CASCADE;
DROP TABLE IF EXISTS guests CASCADE;

CREATE TABLE parks (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(2048) NOT NULL,
  description TEXT
);

CREATE TABLE trails (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  map_url VARCHAR(2048) NOT NULL,
  image VARCHAR(2048) NOT NULL,
  description TEXT,
  status VARCHAR(255) NOT NULL,
  warning TEXT,
  park_id INTEGER REFERENCES parks(id) ON DELETE CASCADE
);

CREATE TABLE passes (
  id SERIAL PRIMARY KEY NOT NULL,
  pass_duration VARCHAR(255) NOT NULL,
  max_capacity INTEGER NOT NULL,
  trail_id INTEGER REFERENCES trails(id) ON DELETE CASCADE
);

CREATE TABLE visitors (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE pass_entries (
  id SERIAL PRIMARY KEY NOT NULL,
  number_in_party INTEGER NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(255) NOT NULL,
  max_capacity INTEGER NOT NULL,
  trail_id INTEGER REFERENCES trails(id) ON DELETE CASCADE,
  visitor_id INTEGER REFERENCES visitors(id) ON DELETE CASCADE
);

CREATE TABLE available_interviewers (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  day_id INTEGER REFERENCES days(id) ON DELETE CASCADE,
  pass_entry_id INTEGER REFERENCES pass_entries(id) ON DELETE CASCADE
);