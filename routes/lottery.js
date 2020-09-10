const router = require("express").Router();
require('dotenv').config();
const bodyParser = require('body-parser');

const { processWinners } = require('../helpers/getWinners');
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
      const trails = result.rows;
      const entries = result.rows.map((trail) => {
        return db.query(`
          SELECT *
          FROM pass_entries 
          WHERE trail_id = ${trail.id} 
          AND date = '${date}'
          ;`);
      })
      Promise.all(entries)
      .then((allTrailsEntries) => {
        let winners = []
        allTrailsEntries.forEach((trailEntries, i) => {
          winners.push(processWinners(db, trailEntries.rows, trails[i].max_capacity))
        })
        Promise.all(winners)
        .then(() => {
          res.status(200).json({ status: 'success' })
        })
        .catch(err => {
          res
          .status(500)
        });
      })
      .catch(err => {
        res
        .status(500)
      });
    })
    .catch(err => {
      res
      .status(500)
    });
  });
  return router;
};
