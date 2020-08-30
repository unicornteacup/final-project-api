const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/users", (request, response)=> {
    let query = `
    SELECT *
    FROM visitors
      ;`
    db.query(query)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })

      // .catch(err => {
      //   res
      //     .status(500)
      //     .json({ error: err.message });
      // });

  });

  return router;
};
