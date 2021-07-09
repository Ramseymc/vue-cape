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

  router.post("/createClient", upload.array("documents"), (req, res) => {
      // console.log("The Body", req.body)
      // console.log("TEST",req.files)
    //  res.json({awesome: "It Works!!!!"})

    //

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

      // let fileDetails = [
      //   {
      //     fileType: "fileOTP",
      //     fileName: "otpDocument",
      //   },
      //   {
      //     fileType: "fileFica",
      //     fileName: "ficaDocument1",
      //   },
      //   {
      //     fileType: "fileFica",
      //     fileName: "ficaDocument2",
      //   },
      //   {
      //     fileType: "filePaySlip",
      //     fileName: "payslipDocument1",
      //   },
      //   {
      //     fileType: "filePaySlip",
      //     fileName: "payslipDocument2",
      //   },
      //   {
      //     fileType: "fileId",
      //     fileName: "idDocument1",
      //   },
      //   {
      //     fileType: "fileBankStatement",
      //     fileName: "bankStatementDocument1",
      //   },
      
      // ];
      
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
      // console.log("OTP",fileOTP)
      // console.log("Fica",fileFica)
      // console.log("Payslip",filePaySlip)
      // console.log("Bank",fileBank)
      // console.log("ID",fileId)

   

          let mysql = `INSERT INTO salesinfo (firstname, lastname, iDNumber, email, bankName, accountNumber, accountType, block, unit, fileOTP, fileId, fileBank, filePaySlip, fileFica) VALUES (
                '${req.body.firstName}','${req.body.lastName}','${req.body.iDNumber}','${req.body.email}','${req.body.bankName}','${req.body.accountNumber}','${req.body.accountType}','${req.body.block}','${req.body.unit}','${fileOTP}','${fileId}',
                '${fileBank}','${filePaySlip}','${fileFica}'
      );`

//       console.log(mysql)
//       INSERT INTO salesinfo (firstname, lastname, iDNumber, email, bankName, accountNumber, accountType, block, unit, fileOTP, fileId, fileBank, filePaySlip, fileFica) VALUES (
//         'Connor','McLean','9308175039088','test@gmail.com','CAPITEC','1234567890','SAVINGS','Block E','E201','40e06e9d5e56129ac32dbfe55b8cf79d','4c57bec808d2ffae784faf691bfe4ea2',
//         '7f7084baa1709b0f8f3a3f7d764fb1cb','7fda700ee2f8c0bc0523f9cefc8dd2bd,11327f704ba7574d47db295d295a17e4','4a9f81523e5ba28ca01dd03c83fada27,3165327ce4b84f850e793c319858f95e'
// );

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