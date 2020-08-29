const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/trails", (req, res) => {
    let query = `
    SELECT *
    FROM trails
    WHERE trails.id = 1 
      ;` //[req.params.trailId];
    db.query(query)
      .then(data => {
        const trails = data.rows;
        res.json({ trails });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
