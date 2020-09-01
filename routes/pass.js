const router = require("express").Router();

module.exports = db => {

  // getting all the parks
  router.get("/pass", (req,res) => {
    db.query(
      `
      SELECT *
      FROM pass_entries
      JOIN guests ON guests.entry_id = pass_entries.id
      JOIN visitors ON visitor_id = visitors.id
      JOIN trails ON trail_id = trails.id
      WHERE visitor.id = 1
    `
    )
    .then(result => {
        res.status(200).json({pass_entries: result.rows})
      })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};