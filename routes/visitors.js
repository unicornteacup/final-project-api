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


  router.post("/visitors", (req,res) => {
    db.query(
        `
        UPDATE visitors
        SET visitors_first_name =$1::text, visitors_last_name =$2::text, visitors_phone =$3::integer, visitors_email =$4::text, visitors_password =$5::text
        RETURNING *
        `,[req.body.first_name, req.body.last_name, req.body.phone, req.body.email, req.body.password])
 
    .then(result => {
      res.status(200).json({visitors: result.rows});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};