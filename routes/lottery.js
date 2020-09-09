const router = require("express").Router();
require('dotenv').config();
const bodyParser = require('body-parser');

const { winners } = require('../helpers/getWinners');


const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;

module.exports = db => {

  // tomorrow Date
  let date = new Date;
  date.setHours(0, 0, 0, 0);
  date = date.setDate(date.getDate() + 1);
  date = new Date(date);
  date = date.toDateString().slice(4);

  //get all entries for date
  router.get("/lottery", (req,res) => {
    db.query(`SELECT * FROM trails;`)
    .then(result => {
      const entries = result.rows.map((trail) => {
        return db.query(`
          SELECT *
          FROM pass_entries 
          WHERE trail_id = ${trail.id} 
          AND date = '${date}'
          ;`)
          .then(result => {
            console.log(winners(result.rows, trail.max_capacity))
            res.json({trail: result.rows})
          })
          .catch(err => {
            res
            .status(500)
            .json({ error: err.message });
          })
      })
      Promise.all(entries)
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  return router;
};



        // `
        // SELECT *
        // FROM pass_entries 
        // WHERE trail_id = 12 AND date = '09-Sep-2020';

        // WHERE date = `