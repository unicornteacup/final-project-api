const router = require("express").Router();

module.exports = db => {

  // GET past history of bookings. Which trail, which date, which guests for specific visitor/user
  router.get("/mybookings", (req,res) => {

    db.query(
      `SELECT pass_entries.*, guests.*, visitors.*
      FROM pass_entries 
      JOIN trails ON trail_id = trails.id
      JOIN guests ON entry_id = pass_entries.id
      JOIN visitors ON visitors.id = pass_entries.visitor_id
      WHERE visitor_id= $1
      `, [req.query.visitor_id]
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

  // Deleting a pass 
  router.delete("/mybookings", (req,res) => {
  
    db.query(
      `
      DELETE FROM pass_entries
      WHERE pass_entries.id = $1::integer
      RETURNING *
     `, 
       [req.query.id])

    .then(result => {
      res.status(200).json({pass_entries: result.rows});
    })

    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });

// Editing the guests on pass_entries
  router.post("/mybookings", (req,res) => {
    db.query(
        `
        UPDATE guests 
        SET guests_first_name =$1::text, guests_last_name =$2::text, guests_phone =$3::integer, entry_id =$4::integer
        WHERE id = $5::integer
        RETURNING *
        `,[req.body.first_name, req.body.last_name, req.body.phone, req.query.entry_id, req.query.id])
 
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