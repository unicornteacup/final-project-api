const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/parks", (req, res) => {
    let query = 'SELECT * FROM parks;';
    db.query(query)
      .then(data => {
        const parks = data.rows;
        res.json({ parks });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
