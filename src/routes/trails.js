const router = require("express").Router();

module.exports = db => {
  router.get("/trails", (request, response) => {
    db.query(
      `
      SELECT
        trails.id,
        trails.name,
        trails.description AS description,
        trails.image AS image,
        trails.status AS status,
        trails.warning AS warning,
        array_agg(DISTINCT trails.id) AS trails,
      FROM trails
      JOIN parks ON parks_id = parks.id
      GROUP BY trails.id
      ORDER BY trails.id
    `
    ).then(({ rows: trails }) => {
      response.json(trails);
    });
  });

  return router;
};