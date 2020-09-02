const router = require("express").Router();

module.exports = db => {
//Getting all the trails
  router.get("/trails", (req, res) => {
    db.query(
      `
      SELECT *
        FROM trails`
    )
    .then(result => {
      console.log(result)
      res.status(200).json({trails: result.rows})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //Getting individual trails

  router.get("/trails/:id", (req, res) => {
    db.query(
      `
      SELECT
        trails.id,
        trails.name AS name,
        trails.description AS description,
        trails.image AS image,
        trails.status AS status,
        trails.warning AS warning,
        trails.max_capacity AS max_capacity
        FROM trails
        JOIN parks ON park_id = parks.id
        WHERE trails.park_id = $1`, [req.params.id]
    )
    .then(result => {
      res.status(200).json({trails: result.rows})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};