const router = require("express").Router();

module.exports = db => {
  
//Making a new pass 
router.post("/pass_entries", (req,res) => {
  console.log(req.body)
  let passentry = req.body.passentry
  db.query(
    `
    INSERT into pass_entries(visitor_id, trail_id, date,status)
    VALUES($1::integer, $2::integer, $3::date, 'pending' )
    RETURNING *`,
  [passentry.visitorId, passentry.trailId, passentry.date]
  )
  .then(result => {
    let passId = result.rows[0].id

    let guestResults = Promise.all(
      passentry.guests.map((guest) =>{
        return db.query(
          `
          INSERT INTO guests (guests_first_name, guests_last_name, guests_phone, entry_id)
          VALUES($1::text, $2::text, $3::integer, $4::integer)
          RETURNING *
          `,[guest.firstName, guest.lastName, guest.phone, Number(passId)]
        )
        .then(result => result.rows[0])
      })
    )
    return Promise.all([result.rows[0], guestResults])
  })
  .then(([passEntry, guestResults]) => {
    passEntry.guests = guestResults
    res.status(200).json(passEntry)
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
    WHERE id = $1::integer`, [ Number(req.query.id)]
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