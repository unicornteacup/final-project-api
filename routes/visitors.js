const router = require("express").Router();

module.exports = db => {
  // get request for the form 
  router.get("/visitors", (req, res) => {
    db.query(
      `
      SELECT * 
      FROM visitors
      WHERE visitors.id = 3
    `)
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