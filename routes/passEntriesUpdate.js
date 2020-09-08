const router = require("express").Router();

module.exports = db => {

  router.post("/update", (req,res) => {
    
    db.query(
      `
      UPDATE pass_entries
      SET status=$1::text
      WHERE id =$2::integer
      RETURNING *
      ;`,
    [req.body.status, req.body.id]
    )
    .then(result => {
        res.status(200).json({ pass_entries: result.rows })
      })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};