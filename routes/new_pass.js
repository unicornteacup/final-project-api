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
      INSERT INTO visitors 
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