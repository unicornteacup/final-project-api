const router = require("express").Router();
require('dotenv').config();
const bodyParser = require('body-parser');


module.exports = db => {

  // tomorrow Date
  let date = new Date;
  date.setHours(0, 0, 0, 0);
  date = date.setDate(date.getDate() + 1);
  date = new Date(date);
  date = date.toDateString().slice(4);

  //get all entries for date
  router.get("/date_entry", (req,res) => {
    db.query(`
      SELECT *
      FROM pass_entries 
      WHERE trail_id = $1
      AND date = $2
      ;`, [req.body.trail, req.body.date])
      .then(result => {
        res.status(200).json({entries: result.rows});
      })
      .catch(err => {
        res
        .status(500)
        .json({ error: err.message });
      })
  });
  return router;
};