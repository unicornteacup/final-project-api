const router = require("express").Router();

module.exports = db => {
  router.get("/parks", (request,response) => {
    db.query(
      `
      SELECT *
      FROM parks
      JOIN trails ON parks_id = parks.id
      GROUP BY parks.id
      ORDER BY parks.id
    `
    )
    .then(({ rows: parks }) => {
      res.json(parks);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

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
        GROUP BY parks.id
        ORDER BY parks.id
      `
      ).then(({ rows: parks }) => {
        response.json(parks);
      });
    });
  };

  return router;
};