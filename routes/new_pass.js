const router = require("express").Router();

module.exports = db => {

  // SHOW EMPTY FORM???? 
  // router.get("/new_pass", (req,res) => {
    
  //   db.query(
  //     `
  //     SELECT *
  //     FROM visitors
  //     JOIN guests ON guests.entry_id = pass_entries.id
  //     JOIN visitors ON visitor_id = visitors.id
  //     JOIN trails ON trail_id = trails.id
  //     WHERE visitor.id = 1
  //   `
  //   )
  //   .then(result => {
  //       res.status(200).json({pass_entries: result.rows})
  //     })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
  // });


  // INSERTING new info into database
  router.put("/new_pass", (req,res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    // const { student, interviewer } = req.body.interview;

    db.query(
      `
      INSERT INTO interviews (student, interviewer_id, appointment_id) VALUES ($1::text, $2::integer, $3::integer)
      ON CONFLICT (appointment_id) DO
      UPDATE SET student = $1::text, interviewer_id = $2::integer
    `,
      [student, interviewer, Number(request.params.id)]
    )

    db.query(
      `
      INSERT INTO guests (first_name, last_name, phone)
      VALUES($1::text, $2::text, $3::integer)

      JOIN guests ON guests.entry_id = pass_entries.id
      JOIN visitors ON visitor_id = visitors.id
      JOIN trails ON trail_id = trails.id
      WHERE visitor.id = 1
    `
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