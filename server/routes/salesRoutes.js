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
  
  // this is going to fire when opening SalesInfo.vue, check the reponse out, use it in a :for-each <v-list> for each row 
  // also add an icon to download the attached files
  //
  router.post("/getClientInfoForSalesInfo", (req, res) => {
    let mysql = `select * from salesinfo where id > 0 and firstName > '';`
    pool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        resizeBy.send("Error with connection");
      }
      connection.query(mysql, function (error, result) {
        if (error) {
          console.log(error);
          
        } else {
          console.log("SERVER-SIDE, RESULT in salesRoutes.js",result)
          res.json(result);
        }
      });
      connection.release();
    });
  });

  router.post("/deleteSalesRecord", (req, res) => {
    let mysql = `delete from salesinfo where id = ${req.body.id}`
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

  router.post("/updateClient", upload.array("documents"), (req, res) => {
    console.log(req.body.thisData[0].firstName)
      res.json({Awesome: "it Works!!!!"})
      
      let mysql = `Ipdate salesinfo set firstname='${req.body.firstName}' etc etc , lastname, iDNumber, email, bankName, accountNumber, accountType, block, unit, fileOTP, fileId, fileBank, filePaySlip, fileFica) VALUES (
        '${req.body.firstName}','${req.body.lastName}','${req.body.iDNumber}','${req.body.email}','${req.body.bankName}','${req.body.accountNumber}','${req.body.accountType}','${req.body.block}','${req.body.unit}','${fileOTP}.pdf','${fileId}.pdf',
        '${fileBank}.pdf','${filePaySlip}.pdf','${fileFica}.pdf'
);`

// //
// pool.getConnection(function (err, connection) {
// if (err) {
//   connection.release();
//   resizeBy.send("Error with connection");
// }
// connection.query(mysql, function (error, result) {
//   if (error) {
//     console.log(error);
//   } else {
//     res.json(result);
//     console.log("After INSERT stmnt")
//     console.log(result)
//   }
// });
// connection.release();
// });

  })

  
  router.post("/createClient", upload.array("documents"), (req, res) => {
      // console.log("The Body", req.body)
      // got mutler files
      // pull the mimetype from req.files - futureproof
      let fileDetails = []

      // where do we use the documents array input parameter?
      // NB! I need to Understand the documents and req.files difference
      let contains = req.body.contains.split(",")
      console.log("FILETypes",contains)
      console.log("FILES",req.files)
      console.log("FILEextType","")

      // go through contains, and get the matching file, insert it into the fileDetails array
      contains.forEach((el, index) => {
        let fileType = el
        if (el !== null) {
          var fileExt = req.files[index].mimetype.substr(req.files[index].mimetype.indexOf('/') + 1, req.files[index].mimetype.length - req.files[index].mimetype.indexOf('/'))
          console.log('FileExt = ', fileExt )
          
          var fileN = req.files[index].filename
          console.log('Index of Extension = ', fileN.indexOf(fileExt) )
          let fileName = req.files[index].filename
          if (fileN.indexOf(fileExt) > 0) {
            fileName = fileName + "." + fileExt //Add MimeType (pdf/jpg etc)
          }
          // let fileName = req.files[index].filename + "." + fileExt //Add MimeType (pdf/jpg etc)
          // help with the fileExt , why is it updating all the DB records and why is it appending twice on trying to Download/GET the file 
         // console.log("SERVER SIDE FileInfo before INSERT", req.files[index])
          let insert = {
              fileType: fileType,
              fileName: fileName 
            }
            fileDetails.push(insert)
        }
      })
      console.log("TEST",req.files)  // this array is blank again
      console.log(fileDetails)

      // TEST [
      //   {
      //     fieldname: 'documents',
      //     originalname: 'account_statement.pdf',
      //     encoding: '7bit',
      //     mimetype: 'application/pdf',
      //     destination: './public/uploads/',
      //     filename: 'de330fdf2feddc92c5856409a7db3aa4',
      //     path: 'public\\uploads\\de330fdf2feddc92c5856409a7db3aa4',
      //     size: 51743
      //   }
      // ]
      // [
      //   { fileType: 'fileOTP', fileName: 'de330fdf2feddc92c5856409a7db3aa4' }
      // ]

      fileDetails.forEach((el) => {
        let filtered = req.files.filter((el2) => {
          return el2.filename === el.fileName
        })
        el.fileNameUpdated = `${el.fileName}.${filtered[0].mimetype.split("/")[1]}`
        fs.rename(`public/uploads/${el.fileName}`, `public/uploads/${el.fileNameUpdated}`, (err) => {
          if (err) throw err
          console.log("Done")
        } )
      })


      
      let fileFica;
      let fileOTP;
      let filePaySlip;
      let fileBank;
      let fileId;
      
      if (fileDetails.length) {
        fileOTP = fileDetails.filter((el) => {
          return el.fileType === 'fileOTP'
        })
        if (fileOTP.length) {
          fileOTP = fileOTP[0].fileName
        } else {
          fileOTP = ""
        }
        fileBank = fileDetails.filter((el) => {
          return el.fileType === 'fileBank'
        })
        if (fileBank.length) {
          fileBank = fileBank[0].fileName
        } else {
          fileBank = ""
        }
        fileId = fileDetails.filter((el) => {
          return el.fileType === 'fileId'
        })
        if (fileId.length) {
          fileId = fileId[0].fileName
        } else {
          fileId = ""
        }
        fileFica = fileDetails.filter((el) => {
          return el.fileType === 'fileFica'
        })
        if (fileFica.length === 1) {
          fileFica = fileFica[0].fileName
        } else if (fileFica.length > 1) {
          let ficaData = []
          fileFica.forEach((el) => {
            ficaData.push(el.fileName)
          })
          // console.log(ficaData)
          fileFica = ficaData.join(",")
        } else {
          fileFica = ""
        }
      
        filePaySlip = fileDetails.filter((el) => {
          return el.fileType === 'filePaySlip'
        })
        if (filePaySlip.length === 1) {
          filePaySlip = filePaySlip[0].fileName
        } else if (filePaySlip.length > 1) {
          let fileData = []
          filePaySlip.forEach((el) => {
            fileData.push(el.fileName)
          })
          // console.log(fileData)
          filePaySlip = fileData.join(",")
        } else {
          filePaySlip = ""
        }
      }   

          let mysql = `INSERT INTO salesinfo (firstname, lastname, iDNumber, email, bankName, accountNumber, accountType, block, unit, fileOTP, fileId, fileBank, filePaySlip, fileFica) VALUES (
                '${req.body.firstName}','${req.body.lastName}','${req.body.iDNumber}','${req.body.email}','${req.body.bankName}','${req.body.accountNumber}','${req.body.accountType}','${req.body.block}','${req.body.unit}','${fileOTP}.pdf','${fileId}.pdf',
                '${fileBank}.pdf','${filePaySlip}.pdf','${fileFica}.pdf'
      );`

      //
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
      // console.log("fileDetails",fileDetails)
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