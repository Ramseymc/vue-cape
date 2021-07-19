const express = require("express");
const router = express.Router();
const pool = require("./connection");
const nodemailer = require("nodemailer");
const multer = require("multer");
const fs = require("fs");
const chalk = require("chalk")

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

// Server Methods
router.get("/test", (req,res) => {
  res.json({Awesome: "It Works!!!!!"})
})

// get blocks for development
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

  // get avail units for selected development and block
  router.post("/getUnitsForOptions", (req, res) => {
    let mysql = `SELECT 
      u.unitName 
    FROM units u 
    LEFT JOIN subsection s ON s.id = u.subsection 
    LEFT JOIN salesinfo si ON si.unit = u.unitName AND si.block = s.subsectionName 
    WHERE u.unitName NOT IN 
      ( SELECT 
        u.unitName 
        FROM units u JOIN subsection s ON s.id = u.subsection 
        JOIN salesinfo si ON si.unit = u.unitName AND si.block = s.subsectionName 
        WHERE s.subsectionName = '${req.body.subsectionName}' ) 
    AND s.subsectionName = '${req.body.subsectionName}';`

    // console.log(mysql);
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
  
  // get all valid salesInfo
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

  // delete salesinfo record matching 'id'
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

  // update the salesinfo record matching 'id'
  router.post("/updateClient", upload.array("documents"), (req, res) => {
    console.log(req.body.thisData[0].firstName)
      //res.json({Awesome: "it Works!!!!"})

      let mysql = `UPDATE salesinfo 
      SET 
       firstName='${req.body.thisData[0].firstname}',
       lastName='${req.body.thisData[0].lastname}',
       iDNumber='${req.body.thisData[0].iDNumber}',
       email='${req.body.thisData[0].email}',
       bankName='${req.body.thisData[0].bankName}',
       accountNumber='${req.body.thisData[0].accountNumber}',
       accountType='${req.body.thisData[0].accountType}',
       block='${req.body.thisData[0].block}',
       unit='${req.body.thisData[0].unit}',
       salesEmailSent='${req.body.thisData[0].salesEmailSent}',
       dateCreated=""
      WHERE id='${req.body.thisData[0].id}'`

      console.log("mySQL = ", mysql);

      pool.getConnection(function (err, connection) {
        if (err) {
          connection.release();
          resizeBy.send("Error with connection");    
        }
        connection.query(mysql, function (error, result) {
          if (error) {    
            console.log(error);
            
          } else {
            console.log("_UPDATE SUCCESS");
            res.json(result);
          }
        });
        connection.release();
      });  

  })

  router.post("/sendSalesInfoEmail", (req, res) => {
    //let mysql = `select first_name, last_name, emailAddress from suppliers where contactID = '${req.body.supplier}'`;
    //let filename = req.body.PONumber;
    console.log("XXXX",req.body)
    let subject = "New Sales Agreement Signed"
    let recipient = "connorm11111@gmail.com"
    // ${req.body.info[0].firstname} ${req.body.info[0].firstname}
    
          // The following documents have been received
         let output = `Dear Debbie/Donovan,
          Please find the attached information regarding a client sale;
          <br><br><br>
          
          <strong> 
            First Name: ${req.body.info[0].firstname} 
            <br>
            Last Name: ${req.body.info[0].lastname}
            <br>
            Block: ${req.body.info[0].block}
            <br>
            Unit: ${req.body.info[0].unit}
          </strong>
          
          <br><br>          
          Kind regards
          <br><br>
  
          <strong>Sales Sytem</strong><br>
          Oppurtunity Private Capital<br>
          CPC<br><br>
          `;

        sendMail(subject, recipient, output)
        .then(() => {
          let mysql = `update salesinfo set salesEmailSent = Y where id = '${req.body.info[0].id}'`;
          console.log(chalk.blue(mysql));
          connection.query(mysql, function (error, result) {
            if (error) {
              console.log("THE ERROR", error);
            } else {
              console.log(result);
              res.json({
                success: true,
                hello: "Goodbye",
                fileName: recipient,
              });
            }
          });
        })
        .catch((e) => {
          res.json({ success: false });
        });
    connection.release();
  },
    
  async function sendMail(subject, recipient, output) {
    let mailOptions = {
      from: "Cape Projects Construction <wayne@eccentrictoad.com>",
      to: `${recipient}`,
      cc: ["waynebruton@icloud.com"],
      subject: `${subject}`,
      text: "Hello world?",
      html: output,
      // attachments: [
      //   {
      //     filename: `${filename}.pdf`,
      //     path: `public/purchaseorders/${filename}.pdf`, // stream this file
      //   },
      // ],
    };
  
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error with connection", error);
      }
    });
  },
  
  router.post("/createClient", upload.array("documents"), (req, res) => {
  
      // pull the mimetype from req.files - futureproof
      let fileDetails = []
      let contains = req.body.contains.split(",")       

      contains.forEach((el) => {
        req.files.forEach((el2) => {
          // if (el === el2.filename) {
            el2.filenameA = `${el2.filename}.${el2.mimetype.split("/")[1]}`
            let insert = {
              fileType: el,
              fileName: el2.filenameA,
              originalName: el2.filename
            }
            fileDetails.push(insert)
          // }
           
        })
      })          

      // rename the uploaded file with the correct extension
      // ** NOTE: I can remove the fileExt / fileN substr check
      fileDetails.forEach((el) => {
        let filtered = req.files.filter((el2) => {
          return el2.filename === el.originalName
        })
        // el.fileNameUpdated = `${el.fileName}.${filtered[0].mimetype.split("/")[1]}`
        el.fileNameUpdated = `${el.fileName}`
        fs.rename(`public/uploads/${el.originalName}`, `public/uploads/${el.fileNameUpdated}`, (err) => {
          if (err)           
             throw err                      
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
                '${req.body.firstName}','${req.body.lastName}','${req.body.iDNumber}','${req.body.email}','${req.body.bankName}','${req.body.accountNumber}','${req.body.accountType}','${req.body.block}','${req.body.unit}','${fileOTP}','${fileId}',
                '${fileBank}','${filePaySlip}','${fileFica}'
      );`

      console.log(chalk.red(mysql))

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
  })

  let transporter = nodemailer.createTransport({
    host: process.env.MAILHOST,
    port: 465, //587
    secure: true,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

module.exports = router;