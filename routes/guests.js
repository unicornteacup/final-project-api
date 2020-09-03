const router = require("express").Router();

module.exports = db => {

  // INSERTING guests into pass_entry
  router.post("/guests", (req,res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }

    // console.log('req.params.entry_id', req.params.entry_id)
    db.query(
        `
        INSERT INTO guests (first_name, last_name, phone, entry_id)
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

  router.get("/guests", (req,res) => {
    
    db.query(
      `
      SELECT *
      FROM guests
    `)
    .then(result => {
        res.status(200).json({guests: result.rows})
      })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });



  //GETTING specific guest
router.get("/guests/:id", (req,res) => {
    
    db.query(
      `
      SELECT *
      FROM guests
      WHERE guests.id = $1`, [req.params.id]
    )
    .then(result => {
        res.status(200).json({guests: result.rows})
      })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  //deleting guests through the pass_id
  router.delete("/guests/:id", (req, res) => {
    if (process.env.TEST_ERROR) {
      setTimeout(() => response.status(500).json({}), 1000);
      return;
    }
    // console.log(req.body)
    db.query(
      `
      DELETE FROM guests
      WHERE id = $1::integer`, [ Number(req.params.id)])

    .then(result => {
      return db.query(
      `
      SELECT *
      FROM guests
    `)
    })

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