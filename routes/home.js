const router = require("express").Router();

module.exports = db => {

  // getting all the parks
  router.get("/home", (req,res) => {
    db.query(
      `
      SELECT *
      FROM parks
    `
    )
    .then(result => {
        res.status(200).json({parks: result.rows})
      })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};