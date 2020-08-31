const router = require("express").Router();

module.exports = db => {
  router.get("/new_entries", (req, res) => {
    db.query(
      `
      SELECT
        visitors.id,
        visitors.first_name,
        visitors.description AS description,
      FROM visitors
      JOIN trails ON parks_id = parks.id
      JOIN pass_entries ON visitor_id = visitors.id
      JOIN guests ON entry_id = pass_entries.id
      GROUP BY visitors.id
      ORDER BY visitors.id
    `
    ).then(({ rows: visitors }) => {
      response.json(visitors);
    });
  });

  return router;
};