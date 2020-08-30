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
 
  });

  return router;
};
