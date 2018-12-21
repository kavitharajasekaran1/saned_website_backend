

'use strict';

//CREATE TABLE login_test1 (ID INT,user_id VARCHAR(100) NOT NULL,password VARCHAR(100) NOT NULL);

const express = require('express');
const mysql = require('mysql');
const Cryptr = require('cryptr');
const SendOtp = require('sendotp');
const app = express();
//const emailExistence = require('email-existence')
var con = require('./config/DBConfig.js');
var dbFunc = require('./config/Connection.js');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const cryptr = new Cryptr('myTotalySecretKey');
const sendOtp = new SendOtp('244272APSziUwF95bd0480c');
//const log4js = require('log4js');
const cors = require('cors')
//const logger = log4js.getLogger('Amon_project');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
//let date = require('date-and-time');
const secret = 'mysecretsshhh';
const router = express.Router();
var translate = require('node-google-translate-skidz');
let date = require('date-and-time');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
let now = new Date();



module.exports = router =>  {

  router.post('/register', async (req, res) => {
    var email_id = req.body.email;
    console.log("em",email_id);
    let password = cryptr.encrypt(req.body.password);
    var name_en = req.body.name;
    // var title_en = req.body.title;
    var title_en = "Saned";
    var company_en = req.body.company;
    var nationality_en = req.body.nationality;
    var phone_nmuber = req.body.phone;
    var mobile_number = req.body.mobile;
    var address_en = req.body.address;
    var po_box = req.body.po_box;
    var language = req.body.language;
    // var interests_en = req.body.interest;
    var interests_en = "games";
    var newsletter = req.body.newsletter;
    //var type_name = req.body.typename;
    var type_name = "user";
    var type_description = req.body.typedescription;
    var name_ar,company_ar,nationality_ar,address_ar,interests_ar,title_ar;
    
    //var email_verify_link = "";
    var verify_email ="N";
    var verify_mobile ="N";
    var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
    dbFunc.connectionRelease;
    await translate({text:name_en,source: 'en',target: 'ar'}, function(result) {
      //console.log(result1);
       name_ar= result.sentences[0].trans;
      console.log(name_ar,"hiiii")
    
      });
      console.log(name_ar,"heeee")
    
      await translate({text:company_en,source: 'en',target: 'ar'}, function(result) {
        //console.log(result1);
         company_ar= result.sentences[0].trans;
          
        });
        console.log(company_ar)
        await translate({text:title_en,source: 'en',target: 'ar'}, function(result) {
          //console.log(result1);
           title_ar= result.sentences[0].trans;
        
          });
          console.log(title_ar,"title_ar")
           await translate({text: nationality_en,source: 'en',target: 'ar'}, function(result) {
            //console.log(result1);
             nationality_ar= result.sentences[0].trans;
          
            });
            console.log(nationality_ar,"nationality")
            await translate({text: address_en,source: 'en',target: 'ar'}, function(result) {
              //console.log(result1);
               address_ar= result.sentences[0].trans;
            
              });
              console.log(address_ar,"address_ar")
              await translate({text: interests_en,source: 'en',target: 'ar'}, function(result) {
                //console.log(result1);
                 interests_ar= result.sentences[0].trans;
              
                });
                console.log(interests_ar,"interests")
    
    
    
    
    con.query(sql, function (err, result) {
    console.log("result",result);
    console.log(result.length != 0);
    //if (err) throw err;
    dbFunc.connectionRelease;
    if(result.length != 0){
    res.send({
      "status":false,
      "Message":"User Already Registered",
              الرسالة: "مستخدم مسجل بالفعل",
             
    })
    dbFunc.connectionRelease;
    }
    //});
    else{	
      // sendOtp.setOtpExpiry('10'); //in minutes
    
      var otp = "";
      var possible = "0123456789";
      for (var i = 0; i < 4; i++)
        otp += possible.charAt(Math.floor(Math.random() * possible.length));
      // var remoteHost = "192.168.0.29:3000";
      // console.log(remoteHost);
    
      var encodedMail = new Buffer(req.body.email).toString('base64');
      //var link = "http://" + remoteHost + "/marine/user/verify?mail=" + email;
      
    //var 	emailtosend = email;
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: "manoj.savaram@rapidqube.com",
          pass: "M$Hpqb$2018"
        }
      });
    //	var remoteHost = "8082"
       var link = "http://localhost:8082/email/verify?mail=" + encodedMail;
      // console.log(link);
    
      // var mailOptions = {
      // 	transport: transporter,
      // 	from: "Aman Services" + "<manoj.savaram@rapidqube.com>",
      // 	to: req.body.email,
      // 	subject: 'Saned Service-Email Verification',
    
      //   html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
    
      // };
    // transporter.sendMail(mailOptions, function(err, info){
    // if(err){}
    //  // res.send({Message:"Please check your email"})
    // });
    var mailOptions = {
      transport: transporter,
      from: "Aman Services" + "<manoj.savaram@rapidqube.com>",
      to: req.body.email,
      subject: 'Saned Service-OTP Verification',
    
      html: "Email confirmation from Aman services,<br> Your one time password is.<br> " + otp + "<br>" +
        "تأكيد بالبريد الإلكتروني من خدمات أمان ، <br> Your One time password is. <br>" + otp
    
    };
    transporter.sendMail(mailOptions, (error, info) => {
      // console.log(info, "information")
      // res.send({
      //   Message: "please check your email for one time password",
      //   الرسالة: "الرجاء التحقق من بريدك الإلكتروني لـ otp"
      // })
      if (error) {
        console.log("Mail send error: ", error);
      }
    //});
    var phonetosend = req.body.phone;
      console.log(phonetosend)
    
    //   var otp = "";
    //   var possible = "0123456789";
     
    //   for (var i = 0; i<4; i++)
    //       otp += possible.charAt(Math.floor(Math.random() * possible.length));
    //   console.log("otp" + otp);
    //   //logger.fatal('OTP getting generate'+ '-->' +otp);
    //   sendOtp.send(phonetosend, "Sanad", otp, function (error, data, response) {
    //       console.log(data,"wow");
    //      // console.log("response",response)
    //       console.log(otp,"otp")
    //       var otptosend = 'your otp is ' + otp;
    //   console.log("your otp is",otp)
    //   //sendOtp.setOtpExpiry('5');
     
       
    //     if(data.type == 'success') {
    //       console.log('OTP verified successfully');
    //   // res.send(otptosend)
    // }
    var sql = "SELECT id FROM types WHERE type_name = '" + type_name + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      logger.fatal("DataBase ERR:",err)
      console.log("user_id",result[0].id)
      var user_type = result[0].id;
    var sql = "INSERT INTO Residents (name_en, name_ar,title_en,title_ar,company_en,company_ar,nationality_en,nationality_ar,phone_nmuber,address_en,address_ar,po_box,mobile_number,email_id,password,verify_mobile,verify_email,language,interests_en,interests_ar,newsletter,user_type,reg_date,otp,email_verify_link) VALUES ('" + name_en + "','" + name_ar + "','" + title_en + "','" + title_ar + "','" +company_en + "','" + company_ar + "','" + nationality_en + "','" + nationality_ar + "','" + phone_nmuber + "','" + address_en + "','" + address_ar + "', '" + po_box + "', '" + mobile_number + "', '" + email_id + "', '" + password + "','" + verify_mobile + "','" + verify_email + "', '" + language + "','" + interests_en+ "', '" + interests_ar + "', '" + newsletter + "','" + user_type + "','" + date.format(now, 'YYYY/MM/DD HH:mm:ss') +"','" + otp + "','" + link + "')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    dbFunc.connectionRelease;
    logger.fatal("DataBase ERR:",err)
    console.log(result,"inserted.......")
    res.send({
        Message: "please check your email for one time password",
        الرسالة: "الرجاء التحقق من بريدك الإلكتروني لـ otp"
      })
    dbFunc.connectionRelease;
                 })
     
       
    })
    
    
    
      
      
    
    });
    }
    
    })
    
    });
    
//=============================email verification======================================================//
router.get("/email/verify", cors(), (req, res, next) => {

	var querymail = req.query.mail;
	console.log("URL: " + querymail);
	var verify_email = "Y"
	var sql ="UPDATE Residents SET verify_email = '" + verify_email + "' WHERE email_id = '" + querymail + "'";
            con.query(sql, function (err) {
              if (err) throw err;
              res.send({Message:"You Are Successfully Registred",
              الرسالة: "أنت مسجل بنجاح"
              });
              dbFunc.connectionRelease;
            });
	
		   
				//res.send({"status": true, "message": "Registration Successful"})
		   // }
		  });
//==========================================Login====================================================//
router.post('/login',cors(),function(req,res) {
  logger.fatal("Entering into Login Service")
  var loginrequest = req.body;
  console.log("request",loginrequest)
  var email_id = req.body.email_id;
  
 var password = req.body.password;

 console.log(email_id)
 console.log(password,"pass_word")

  var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
 
con.query(sql, function (err, result) {
  if (err) throw err;
  dbFunc.connectionRelease;
  logger.fatal("DataBase ERR:",err)
if(result.length ==0){
res.send({Message:"Invalid User name",
status:"false",
الرسالة: "اسم مستخدم غير صالح"
})
dbFunc.connectionRelease;
}
else{
let  registered_password =  cryptr.decrypt(result[0].password);
console.log(registered_password,"db password")
let registered_user = result[0].email_id;
console.log(registered_user,"user nameeeeeeeee")

  if(registered_user == email_id &&  registered_password == password){
    
   
      // Issue token
      const payload = { email_id};
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      console.log("token ==>",token);
      res.cookie('token', token, { httpOnly: true })
        .send({
          Message:"Login Successful",
          status:"true",
          النتيجة: "تسجيل الدخول ناجح",
          Token:token
        
        });
        dbFunc.connectionRelease;
  }
else{
  console.log("pass ")
res.send({
  "status": false,
  Message:"Password is Incorrect",
  
  النتيجة: "اسم المستخدم أو كلمة المرور غير صحيح"


})
}
}
dbFunc.connectionRelease; 
});
});

//===================================================================================//
router.post("/emailotpverification", cors(), (req, res) => {
  var otp = req.body.otp;
  var email_id = req.body.email_id;
console.log(otp);

con.query("SELECT * FROM Residents where otp='" + otp+ "'",  function(error, results, fields) {
    if (error) {
        res.send({
            "status": false,
            "message": "error"
        })
    } else {
        // var results = JSON.parse(JSON.stringify(results));
        console.log(results,"logesh");
        if (results.length > 0) {
            if (results[0].otp === otp) {
                console.log(otp);
                results[0].verify_email = "Y"
                console.log(results[0].uid);
                con.query("UPDATE Residents SET verify_email = '" + results[0].verify_email + "' WHERE email_id = '" + results[0].email_id + "'",  function(error, results, fields) {});

                res.send({
                    status: "true",
                    "message": "otp is verified"
                });
            }} else {
                res.send({
                    status: "false",
                    "message": "Invalid otp"
                });
            }
        // }
    }
});
});





//===============================Email OTP===================================================//
router.post("/emailotp", (req, res) => {
	userResults = req.body;
	console.log(userResults, "request")
	var otp = "";
	var possible = "0123456789";
	for (var i = 0; i < 4; i++)
		otp += possible.charAt(Math.floor(Math.random() * possible.length));
	var remoteHost = "192.168.0.29:3000";
	console.log(remoteHost);

	var encodedMail = new Buffer(req.body.email).toString('base64');
	var link = "http://" + remoteHost + "/marine/user/verify?mail=" + encodedMail;
	var userResults;
	console.log(userResults);

	console.log("results: " + userResults.email);
	let emailtosend = userResults.email;
	var transporter = nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: "manoj.savaram@rapidqube.com",
			pass: "M$Hpqb$2018"
		}
	});
	var remoteHost = "119.81.59.59:8000"
	var link = "http://" + remoteHost + "/email/verify?mail=" + encodedMail;
	console.log(link);

	var mailOptions = {
		transport: transporter,
		from: "Aman Services" + "<manoj.savaram@rapidqube.com>",
		to: req.body.email,
		subject: 'Saned Service-OTP Verification',

		html: "Email confirmation from Aman services,<br> Your Otp is.<br> " + otp + "<br>" +
			"تأكيد بالبريد الإلكتروني من خدمات أمان ، <br> Your Otp is. <br>" + otp

	};
	transporter.sendMail(mailOptions, (error, info) => {
		console.log(info, "information")
		res.send({
      Message: "please check your email for otp",
      status:"true",
			الرسالة: "الرجاء التحقق من بريدك الإلكتروني لـ otp"
		})
		if (error) {
			console.log("Mail send error: ", error);
		}
	});
});
//===============================forgetpassword==============================================//
router.post('/forgetpassword',(req,res) =>{
    
    let forgetpassword = req.body;
    let new_password = req.body.new_password;
    
    let confirm_password = req.body.confirm_password;
    let username = req.body.username;
            let sql = "SELECT  password,email_id FROM Residents where email_id ='" + username + "'";
          
            con.query(sql, function (err, result) {
             // logger.fatal(result,"select")
              if (err) throw err;
              dbFunc.connectionRelease;
              logger.fatal("DataBase ERR:",err)
              //logger.fatal("Database Error while selecting from register table:",err)
              if(result.length == 0){
                res.send({Message:"Invalid User Name",
                الرسالة: "اسم المستخدم غير صالح"              })
                dbFunc.connectionRelease;
              }
            
     else{
      if(new_password !=confirm_password){
      res.send({Message:"password doesn't match",
      الرسالة: "كلمة المرور غير متطابقة"})
      }
      else{
        
      
    
      //else{
       
        
             
              // console.log(result[0])
               if(cryptr.decrypt(result[0].password) == new_password ){

              res.send({
                Message:"Password should not be a previously used one",
                رسالة:"مرور سبق استخدامهاكلمة المرور لا يجب أن تكون كلمة"
               });
               dbFunc.connectionRelease;
              }
            // });
            else{
            console.log(new_password,"try")
            new_password = cryptr.encrypt(req.body.new_password);
           console.log(new_password);
            var sql ="UPDATE Residents SET password = '" + new_password + "' WHERE email_id = '" + username + "'";
            con.query(sql, function (err) {
              if (err) throw err;
              dbFunc.connectionRelease;
              logger.fatal("DataBase ERR:",err)
              res.send({Message:"password is updated",
              رسالة:"تم تحديث كلمة المرور"});
            });
            dbFunc.connectionRelease;
          }
        }
      }
          
    } );
});
  

}
