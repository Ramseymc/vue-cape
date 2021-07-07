const express = require("express");
const router = express.Router();
const pool = require("./connection");
const nodemailer = require("nodemailer");

router.get("/test", (req,res) => {
  res.json({Awesome: "It Works!!!!!"})
})

router.post("/getblocksForOptions", (req, res) => {
    let mysql = `select * from subsection where development = ${req.body.id}`;
    pool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function (error, result) {
        if (error) {
          console.log(error);
          
        } else {
          console.log(result)
          res.json(result);
        }
      });
      connection.release();
    });
  });

  router.post("/getUnitsForOptions", (req, res) => {
    let mysql = `select * from units where development = ${req.body.id} and subsection = ${req.body.subsection}`;
    pool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function (error, result) {
        if (error) {
          console.log(error);
        } else {
          res.json(result);
        }
      });
      connection.release();
    });
  });


module.exports = router;