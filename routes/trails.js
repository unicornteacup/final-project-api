const express = require('express');
const router  = express.Router();

module.exports = db => {

  router.get("/parks/:id/trails", (request, response) => {
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
    })

  })

    router.get("/parks/:id/trail/:id", (request, response) => {
      db.query(
        `
        SELECT
          passes.id,
          passes.pass_duration AS pass_duration,
          passes.description AS description,
          trails.status AS status,
          trails.warning AS warning,
          array_agg(DISTINCT passes.id) AS passes,
        FROM passes
        JOIN trails ON trails_id = trails.id
        GROUP BY passes.id
        ORDER BY passes.id
      `
      ).then(({ rows: trails }) => {
        response.json(trails);
      });
    });


  return router;
};