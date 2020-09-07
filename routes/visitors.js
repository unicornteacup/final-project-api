const router = require("express").Router();

module.exports = db => {
  // get request for the form 
  router.get("/visitors", (req, res) => {
    db.query(
      `
      SELECT * 
      FROM visitors`
    )
    .then(result => {
      res.status(200).json({visitors: result.rows})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });


  // INSERTING visitors into visitors
  router.post("/visitors", (req,res) => {
    db.query(
        `
        INSERT INTO visitors (first_name,last_name, phone, email_address, password)
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

  return router;
};