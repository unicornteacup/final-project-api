const router = require("express").Router();

module.exports = db => {

  router.get("/parks", (req,res) => {
    db.query(
      `
      SELECT
        parks.id,
        parks.name AS name,
        parks.description AS description
      FROM parks
      JOIN trails ON park_id = parks.id
      GROUP BY parks.id
      ORDER BY parks.id
    `
    )
    .then(({ rows: parks }) => {
      res.json(parks);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/parks/:id", (req,res)=> {
      
      console.log('fire')
      console.log('req.params.id', req.params.id)

    db.query(
      `
      SELECT   
        parks.id, 
        parks.name AS name,
        parks.description AS description
      FROM parks
      WHERE parks.id = $1`, [req.params.id])

      .then(result => {
        res.status(200).json({park: result.rows})
      })

      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

      });

  return router;
};