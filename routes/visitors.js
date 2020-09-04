const router = require("express").Router();

module.exports = db => {
  // get request for the form 
  router.get("/visitors", (req, res) => {
    db.query(
      `
      SELECT * 
      FROM visitors`
    )
    .then(result => {
      res.status(200).json({visitors: result.rows})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};


  // JOIN pass_entries ON visitor_id = visitors.id
      // JOIN guests ON entry_id = pass_entries.id
      // JOIN trails ON trail_id = trails.id