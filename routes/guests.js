const router = require("express").Router();

module.exports = db => {
      //GETTING all the guests
// router.get("/guests", (req,res) => {
    
//   db.query(
//     `
//     SELECT *
//     FROM guests`
//   )
//   .then(result => {
//       res.status(200).json({guests: result.rows})
//     })
//   .catch(err => {
//     res
//       .status(500)
//       .json({ error: err.message });
//   });
// });
    //GETTING specific guest
router.get("/guests", (req,res) => {
    
  db.query(
    `
    SELECT *
    FROM guests
    WHERE id = $1`, [req.query.id]
  )
  .then(result => {
      res.status(200).json({guests: result.rows})
    })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


  // INSERTING guests into pass_entry
  router.post("/guests", (req,res) => {
    console.log('req.query',req.query)
    db.query(
        `
        INSERT INTO guests (guests_first_name, guests_last_name, guests_phone, entry_id)
        VALUES($1::text, $2::text, $3::integer, $4::integer)
        RETURNING *
        `,[req.body.guests_first_name, req.body.guests_last_name, req.body.guests_phone, Number(req.query.entry_id)])

    .then(result => {
      res.status(200).json({guests: result.rows});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  //Deleting guests through the pass_id
  router.delete("/guests", (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }
    db.query(
      `DELETE FROM guests
      WHERE id = $1::integer`, [ Number(req.query.id)])
    .then(result => {
      return db.query(
      `
      SELECT *
      FROM guests
    `)
    })
    .then(result => {
      res.status(200).json({guests: result.rows});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  
  return router;
};