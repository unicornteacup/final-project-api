const router = require("express").Router();

module.exports = (db) => {
  router.get("/park", (request, response) => {
    let query = `
    SELECT *
    FROM parks
    JOIN trails ON park_id = parks.id
    WHERE parks.id = 1
      ;` //[req.params.parkId];
    db.query(query)
      .then(data => {
        const park = data.rows;
        res.json({ park });
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  return router;
};
