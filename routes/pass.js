const router = require("express").Router();

module.exports = db => {
  
//GETTING previous passes
router.get("/pass", (req,res) => {
    
  db.query(
    `
    SELECT *
    FROM pass_entries
    JOIN trails `
  )
  .then(result => {
      res.status(200).json({pass_entries: result.rows})
    })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});
  // INSERTING new info into database
  router.post("/pass", (req,res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }
    // console.log(req.body)
    db.query(
      `
      INSERT INTO guests (first_name, last_name, phone, entry_id)
      VALUES($1::text, $2::text, $3::integer,$4::integer)
    `,
    [req.body.first_name, req.body.last_name, req.body.phone, Number(req.params.id)])

    .then(result => {
      return db.query(
      `
      SELECT *
      FROM pass_entries
      JOIN guests ON guests.entry_id = pass_entries.id
      JOIN visitors ON visitor_id = visitors.id
      JOIN trails ON trail_id = trails.id
    `)
    })

    .then(result => {
      res.status(200).json({pass_entries: result.rows});
    })

    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  

  //deleting passes through the pass_id
  router.delete("/pass/:id", (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }
    // console.log(req.body)
    db.query(
      `
      DELETE FROM pass_entries
      WHERE id = $1::integer`, [ Number(req.params.id)])

    .then(result => {
      return db.query(
      `
      SELECT *
      FROM pass_entries
    `)
    })

    .then(result => {
      res.status(200).json({pass_entries: result.rows});
    })

    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  return router;
};