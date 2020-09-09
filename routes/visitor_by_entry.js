const router = require("express").Router();
require('dotenv').config();
const bodyParser = require('body-parser');

const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken, { 
  lazyLoading: true 
});


module.exports = db => {

  router.get("/visitors_by_entry", (req,res) => {
    db.query(`
      SELECT visitors.phone
      FROM pass_entries
      JOIN visitors ON pass_entries.visitor_id = visitors.id
      WHERE pass_entries.id = $1
      ;`, [req.body])
      .then(result => {
        client.messages
        .create({
          from: process.env.TWILIO_PHONE_NUMBER,
          to: 7782292994,
          body: `Confirmation for your ${result.rows.name} on ${result.rows.date}`,
          // mediaUrl: ['https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg']
        })
        .then(() => {
          res.send(JSON.stringify({ result: res.rows }));
        })
        .catch(err => {
          console.log(err);
          res.send(JSON.stringify({ success: false }));
        });
      })
      
    })
  return router;
};