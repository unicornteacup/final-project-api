const router = require("express").Router();

module.exports = db => {
  router.get("/parks", (req,res) => {
    db.query(
      `
      SELECT
        parks.id,
        parks.name AS name,
        parks.description AS description
      FROM parks
      JOIN trails ON park_id = parks.id
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
          parks.description AS description
          array_agg(DISTINCT parks.id) AS parks,
          COUNT(pass_entries.id) AS count,
        FROM parks
        JOIN trails ON park_id = parks.id
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