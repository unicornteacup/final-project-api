const router = require("express").Router();

module.exports = db => {

  // getting past history of bookings. Which trail, which date, which guests
  router.get("/mybookings", (req,res) => {

    db.query(
      `SELECT *
      FROM pass_entries 
      JOIN trails ON trail_id = trails.id
      JOIN guests ON entry_id = pass_entries.id
      JOIN visitors ON visitors.id = pass_entries.visitor_id
      WHERE visitors.id= $1
      `, [req.query.id]
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

// Editing the guest list 
  router.post("/mybookings/:id", (req,res) => {
    db.query(
        `
        INSERT INTO guests (first_name, last_name, phone, entry_id)
        VALUES($1::text, $2::text, $3::integer, $4::integer)
        RETURNING *
        `,[req.body.first_name, req.body.last_name, req.body.phone, req.query.entry_id])

    .then(result => {
      res.status(200).json({guests: result.rows});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  router.delete("/mybookings/:id", (req,res) => {
    db.query(
      `
      SELECT *
      FROM pass_entries
      JOIN guests ON guests.entry_id = pass_entries.id
      JOIN visitors ON visitor_id = visitors.id
      JOIN trails ON trail_id = trails.id
      WHERE pass_entries.id= $1`, [req.params.id]
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











  return router;
};