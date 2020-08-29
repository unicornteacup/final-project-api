const router = require("express").Router();

module.exports = db => {
  router.get("/parks", (request, response) => {
    db.query(
      `
      SELECT
        parks.id,
        parks.name,
        parks.description AS description,
        array_agg(DISTINCT trails.id) AS trails,
      FROM parks
      JOIN trails ON parks_id = parks.id
      GROUP BY parks.id
      ORDER BY parks.id
    `
    ).then(({ rows: parks }) => {
      response.json(parks);
    });
  });

  const router = require("express").Router();

  module.exports = db => {
    router.get("/parks/:id", (request, response) => {
      db.query(
        `
        SELECT
          parks.id,
          parks.name,
          parks.description AS description,
          array_agg(DISTINCT trails.id) AS trails,
          COUNT(pass_entries.id) AS count, 


        FROM parks
        JOIN trails ON parks_id = parks.id
        JOIN passes ON trails_id = trails.id
        JOIN pass_entries ON pass_id = pass.id

        GROUP BY parks.id
        ORDER BY parks.id
      `
      ).then(({ rows: parks }) => {
        response.json(parks);
      });
    });
  
    return router;
  };










  return router;
};