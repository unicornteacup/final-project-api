const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const {pool} = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

const getParks = (request, response) => {
    pool.query('SELECT * FROM parks', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  app
  .route('/')
  // GET endpoint
  .get(getParks)
  // POST endpoint


app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
  });
  