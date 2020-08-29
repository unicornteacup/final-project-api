const router = require("express").Router();

module.exports = db => {
  router.get("/visitors", (request, response) => {
    db.query(
      `
      SELECT
        visitors.id,
        visitors.first_name,
        visitors.description AS description,
        array_agg(DISTINCT trails.id) AS trails,
      FROM visitors
      JOIN trails ON parks_id = visitors.id
      GROUP BY visitors.id
      ORDER BY visitors.id
    `
    ).then(({ rows: parks }) => {
      response.json(parks);
    });
  });

  return router;
};