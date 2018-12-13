//  CREATE TABLE register (ID INT PRIMARY KEY AUTO_INCREMENT,Title VARCHAR(300) , Name VARCHAR(100) ,Company VARCHAR(300) ,Nationality VARCHAR(50) ,PhoneNumber VARCHAR(50) ,Address VARCHAR(300) ,PO_Box VARCHAR(15),Mobile VARCHAR(50) ,Email VARCHAR(100) NOT NULL,Password VARCHAR(100) NOT NULL);


const express = require('express');
const mysql = require('mysql');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const log4js = require('log4js');
log4js.configure({
    appenders: { sharjah_project: { type: 'file', filename: 'sharjah_project.log' } },
    categories: { default: { appenders: ['sharjah_project'], level: 'error' } }
  });

const logger = log4js.getLogger('sharjah_project');


const router = express.Router();
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "Rapidqube",
    password: "Rpqb$2018",
    database:"SHARJAH"
  });


router.post('/register', (req, res) => {
   
logger.fatal("Entering into Registration")

           let user_data = req.body;
           console.log(user_data,"request")
           var mobile = req.body.mobile;
           
           var title = req.body.title;
           let name = req.body.name;
           let company = req.body.company;
           let nationality = req.body.nationality;
           let phonenumber = req.body.phonenumber;
           let address = req.body.address;
           let pobox = req.body.pobox;
           let email = req.body.email;
           let password = cryptr.encrypt(req.body.password);
           console.log(password)
           
           
        console.log(mobile,"mobile");
        var sql = "SELECT  * FROM register_test where Email ='" + email + "'";
    con.query(sql, function (err, result) {
      console.log("result",result);
      logger.fatal(result)
      console.log(result.length != 0);
      if (err) throw err;
      if(result.length != 0){
        res.send({Message:"User Already Registered",
                  الرسالة: "مستخدم مسجل بالفعل"
      })
      }
    
	

          else{    
            var sql = "INSERT INTO register_test (Title, Name,Company,Nationality,PhoneNumber,Address,PO_BOX,Mobile,Email,Password) VALUES ('" + title + "','" + name + "','" + company + "','" + nationality + "','" +phonenumber + "','" + address + "','" + pobox + "','" + mobile + "','" + email + "','" + password + "')";
           con.query(sql, function (err, result) {
         if (err) throw err;
         logger.fatal(err)
         res.send({
            result:"You are successfully registered",
            النتيجة: "أنت مسجل بنجاح"
        })
      });
    }
    
    
 });


  });

    //==============================================otp resssend===============================//
   
   
    module.exports=router;