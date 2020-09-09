require('dotenv').config();
const bodyParser = require('body-parser');


const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
 
const client = require('twilio')(accountSid, authToken, { 
    lazyLoading: true 
});

const getVisitorByEntry = (db, entry) => new Promise((resolve, reject) => {
  db.query(`
      SELECT visitors.phone
      FROM pass_entries
      JOIN visitors ON pass_entries.visitor_id = visitors.id
      WHERE pass_entries.id = $1
      ;`, [entry])
      .then((result) => {
        resolve({ phone: result.rows[0].phone })
      })
      .catch(err => {
        reject({ error: err })
      });
})

const updateEntry = (db, status, id) => new Promise((resolve, reject) => {
  getVisitorByEntry(db, id)
  .then((phone) => {
    db.query(
      `
      UPDATE pass_entries
      SET status=$1::text
      WHERE id =$2::integer
      RETURNING *
      ;`,
    [status, id]
    )
    .then(result => {
      client.messages
        .create({
          from: process.env.TWILIO_PHONE_NUMBER,
          to: phone,
          body: `Your entry ${id} status is ${status}`,
        })
        .then(() => {
          resolve({ pass_entries: result.rows })
        })
        .catch(err => {
          reject({ error: err })
        });
      })
      .catch(err => {
        reject({ error: err })
      });
  })
  .catch(err => {
    reject({ error: err })
  });
})



module.exports = { updateEntry }