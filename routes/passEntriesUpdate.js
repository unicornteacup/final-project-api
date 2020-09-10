const router = require("express").Router();
require('dotenv').config();
const bodyParser = require('body-parser');


const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
 
const client = require('twilio')(accountSid, authToken, { 
    lazyLoading: true 
});

const { updateEntries } = require('../services/updateEntries');

module.exports = db => {

  router.post("/update", (req,res) => {
    updateEntries(db, req.body.status, req.body.id)
    .then(result => {
      res.status(200).json({ pass_entries: result.rows })
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};