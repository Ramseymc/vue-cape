const express = require("express");
const router = express.Router();
const pool = require("./connection");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "application/pdf"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type");
    error.code = "LIMIT_FILE_TYPES";
    console.log(req.path, error);
    return cb(error, false);
  }
  cb(null, true);
};

let MAX_SIZE = 20000000;
const upload = multer({
  dest: "./public/uploads/",
  fileFilter,
  limits: {
    fileSize: MAX_SIZE,
    fieldSize: 100 * 1024 * 1024,
  },
});

router.get("/test", (req,res) => {
  res.json({Awesome: "It Works!!!!!"})
})
//
//
//
//

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

  router.post("/createClient", upload.array("documents"), (req, res) => {
      console.log("The Body", req.body)
      // console.log("TEST",req.files)
     // res.json({awesome: "It Works!!!!"})

      let fileDetails = []

      // console.log(req.body.contains.split(","))

      let contains = req.body.contains.split(",")
      console.log(contains)


      contains.forEach((el, index) => {
        let fileType = el
        let fileName = req.files[index].filename
        let insert ={
            fileType: fileType,
            fileName: fileName 
           }
           fileDetails.push(insert)
      })

      let mysql = 'INSERT INTO `salesinfo` (`firstname`, `lastname`, `iDNumber`, `email`, `bankName`, `accountNumber`, `accountType`, `block`, `unit`, `fileOTP`, `fileId`, `fileBank`, `filePaySlip`, `fileFica`) VALUES ' +
      "(''," + // firstName
      " ''," + // lastName
      " ''," + // iDNumber
      " ''," + // email
      " ''," + // bankName
      " ''," + // accountNumber
      " ''," + // accountType
      " ''," + // block
      " ''," + // unit
      " ''," + // fileOTP
      " ''," + // fileId
      " ''," + // fileBank
      " ''," + // filePaySlip
      " ''" + // fileFica
      ")"

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
            console.log("After INSERT stmnt")
            console.log(result)
          }
        });
        connection.release();
      });

      // ** TO DO-----------------------------------
      // Ask Wayne if this is correct and what the response should kind of be if it's successfull 
      // post results to salesinfo page
      //-----------------------------------------

      // let otpFilename = fileDetails.filter((el) => {
      //   return filetype === "fileOTP"
      // })[0].fileName

      // let idFilename = "";
      // let bankFilename = "";
      // let payslipFilename = "";
      // // let payslipFilenameFilter = fileDetails.filter((el) => {
      // //   return filetype === "filePaySlip"
      // // }) 
      // // if (payslipFilenameFilter.length > 1) {
      // //   "fileName1,filname2"
      // // } 
      
      // let ficaFilename = "";

      // let mysql = `insert into cvlientInfo (firstName, lastName, fileOTP) value (
      //   '${req.body.firstName}', '${req.body.lastName}', '${otpFilename}'
      // )`















    //  fields fileOTP etc String
    //  filePayslip type JSON



      
    

      // fileDetails [
      //   { fileType: 'fileOTP', fileName: undefined },
      
      //   { fileType: 'fileFica', fileName: undefined },
      //   { fileType: 'fileFica', fileName: undefined }
      // ]
      
      //[ 'fileOTP', 'fileFica', 'fileFica' ]
      console.log("fileDetails",fileDetails)
     // TypeError: req.body.contains.forEach is not a function
      // req.files.forEach((el) => {
      //   console.log("forEAch",el)
      //   console.log("forEach Files",el.originalname)
      //   console.log("forEach Files",el.filename)
      // })

    
      // let mysql = `select * from units where development = ${req.body.id} and subsection = ${req.body.subsection}`;
      // pool.getConnection(function (err, connection) {
      //   if (err) {
      //     connection.release();
      //     resizeBy.send("Error with connection");
      //   }
      //   connection.query(mysql, function (error, result) {
      //     if (error) {
      //       console.log(error);
      //     } else {
      //       res.json(result);
      //     }
      //   });
      //   connection.release();
      // });

  })


module.exports = router;