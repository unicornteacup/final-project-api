const router = require("express").Router();

module.exports = db => {
  
//Making a new pass 
router.post("/pass_entries", (req,res) => {
    
  db.query(
    `
    INSERT into pass_entries(visitor_id, trail_id, date,status)
    VALUES($1::integer, $2::integer, $3::date, $4::text )
    RETURNING *`,
  [req.query.visitor_id, req.query.trail_id, req.body.date, req.body.status]
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


//GETTING ALL passes
router.get("/pass_entries", (req,res) => {
    
  db.query(
    `
    SELECT *
    FROM pass_entries
  `
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

//GETTING a specific pass with pass_id
router.get("/pass_entries", (req,res) => {
    
  db.query(
    `
    SELECT *
    FROM pass_entries
    WHERE id = $1::integer`, [ Number(req.params.id)]
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

  //DELETING passes through the pass_id
  router.delete("/pass_entries", (req, res) => {
    console.log(req.query.id)
    db.query(
      `
      DELETE FROM pass_entries
      WHERE id = $1::integer`, [Number(req.query.id)])

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