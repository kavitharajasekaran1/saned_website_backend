'use strict';
// CREATE TABLE register_test1 (ID INT PRIMARY KEY AUTO_INCREMENT,Title VARCHAR(300) , Name VARCHAR(100) ,Company VARCHAR(300) ,Nationality VARCHAR(50) ,PhoneNumber VARCHAR(50) ,Address VARCHAR(300) ,PO_Box VARCHAR(15),Mobile VARCHAR(50) ,Email VARCHAR(100) NOT NULL);

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
const log4js = require('log4js');
const cors = require('cors')
const logger = log4js.getLogger('Amon_project');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
//let date = require('date-and-time');
const secret = 'mysecretsshhh';
const router = express.Router();


module.exports = router => {
// router.post('/register', (req, res) => {
   
//     logger.fatal("Entering into Registration")
//     let user_data = req.body;
//     console.log(user_data,"request")
//     var mobile = req.body.mobile;
    
//     var title = req.body.title;
//     let name = req.body.name;
//     let company = req.body.company;
//     let nationality = req.body.nationality;
//     let phonenumber = req.body.phonenumber;
//     let address = req.body.address;
//     let pobox = req.body.pobox;
//     let email = req.body.email;
//     let password = cryptr.encrypt(req.body.password);
//     console.log(password)
//   //   emailExistence.check('kavitha.rajasekaran@rapidqube.com', function(error, response){
//   //     console.log('res: '+response);
//   // });

        
//     console.log(mobile,"mobile");
//     var sql = "SELECT  * FROM register_test1 where Email ='" + email + "'";
// con.query(sql, function (err, result) {
//   console.log("result",result);
//   logger.fatal(result)
//   console.log(result.length != 0);
//   if (err) throw err;
//   if(result.length != 0){
//     res.send({Message:"User Already Registered",
//               الرسالة: "مستخدم مسجل بالفعل"
//   })
//   }

//   else{
//     {    
//         var sql = "INSERT INTO register_test1 (Title, Name,Company,Nationality,PhoneNumber,Address,PO_BOX,Mobile,Email) VALUES ('" + title + "','" + name + "','" + company + "','" + nationality + "','" +phonenumber + "','" + address + "','" + pobox + "','" + mobile + "','" + email + "')";
//         var sql1 = "SELECT  * FROM register_test1 where Email ='" + email + "'";
        

//        con.query(sql, function (err, result) {
//      if (err) throw err;
//      logger.fatal(err)
     
//     //  res.send({
//     //     result:"You are successfully registered",
//     //     النتيجة: "أنت مسجل بنجاح"
//     // })
//   });
//   con.query(sql1,function (err,result1){
//     if (err) throw err;
//     logger.fatal(err)
//     console.log(result1,"select output")
//     var login_insert = "INSERT INTO login_test1 (ID,user_id,password) VALUES ('" + result1[0].ID + "','" + result1[0].Email + "','" + password + "')";
// con.query(login_insert, function (err, result) {
//     if (err) throw err;
//     logger.fatal(err)
    
//     res.send({
//        result:"You are successfully registered",
//        النتيجة: "أنت مسجل بنجاح"
//    })
//  });
// })
// }

//   }
// })

// });
router.post('/register', (req, res) => {
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
var sql = "SELECT  * FROM register_test1 where Email ='" + email + "'";
con.query(sql, function (err, result) {
console.log("result",result);
console.log(result.length != 0);
if (err) throw err;
dbFunc.connectionRelease;
if(result.length != 0){
res.send({Message:"User Already Registered",
          الرسالة: "مستخدم مسجل بالفعل"
})
dbFunc.connectionRelease;
}

  else{    
    var sql = "INSERT INTO register_test1 (Title, Name,Company,Nationality,PhoneNumber,Address,PO_BOX,Mobile,Email,Password) VALUES ('" + title + "','" + name + "','" + company + "','" + nationality + "','" +phonenumber + "','" + address + "','" + pobox + "','" + mobile + "','" + email + "','" + password + "')";
   con.query(sql, function (err, result) {
 if (err) throw err;
 res.send({
    result:"You are successfully registered",
    النتيجة: "أنت مسجل بنجاح"
})
});
}


});


});
/**********************email verfication */
router.post('/send',function(req,res){
  userResults = req.body;
  var email = req.body.email;
	console.log(userResults, "request")
	var otp = "";
	var possible = "0123456789";
	for (var i = 0; i < 4; i++)
		otp += possible.charAt(Math.floor(Math.random() * possible.length));
	var remoteHost = "192.168.0.29:3000";
	console.log(remoteHost);

	var encodedMail = new Buffer(req.body.email).toString('base64');
	var link = "http://" + remoteHost + "/marine/user/verify?mail=" + email;
	var userResults;
	console.log(userResults);

	console.log("results: " + userResults.email);
var 	emailtosend = userResults.email;
	var transporter = nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: "manoj.savaram@rapidqube.com",
			pass: ""
		}
	});
	var remoteHost = "8082"
	var link = "http://localhost:8082/email/verify?mail=" + email;
	console.log(link);

	var mailOptions = {
		transport: transporter,
		from: "Aman Services" + "<manoj.savaram@rapidqube.com>",
		to: req.body.email,
		subject: 'Aman Service-OTP Confirmation',

    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"

	};
transporter.sendMail(mailOptions, function(err, info){
if(err){
   // console.log(err,"hiiiiiiiiiii");
res.send({Message:"Please provide a vaild EmailId"});
}else{
    console.log("Message sent: " + info.message);
res.end("sent");
 }
});
});

router.get("/email/verify", cors(), (req, res, next) => {
  var status;
  var querymail = req.query.mail;
  console.log("URL: " + querymail);
  
         
              res.send({"status": true, "message": "Registration Successful"})
         // }
        })
/*********************************************** */
// router.post('/login',cors(),function(req,res) {
//     logger.fatal("Entering into login services")
  
//       let loginrequest = req.body;
//       let user_name = req.body.username;
      
//      let pass_word = req.body.password;
//      let now = new Date();
  
  
//       let sql = "SELECT  * FROM register_test1 where user_id ='" + user_name + "'";
      
//      //if the invalid user_id
//     con.query(sql, function (err, result) {
//       //if (err) throw err;
//       if(result.length == 0){
//         res.send({Message:"User Name or Password is Incorrect",
//                   الرسالة: "مستخدم مسجل بالفعل"
//       })
//       }
//       else{
//         var update = "UPDATE register_test1 SET login_time= '" + date.format(now, 'YYYY/MM/DD HH:mm:ss') +"' WHERE user_id='" + user_name + "'";
//          con.query(update,function(err, result){
//         if (err) throw err;
//         logger.fatal("Database error while updating date in login table:",err)
//         console.log(result,"update")
//       })
//       console.log(result.length,"select result")
//       let  registered_password = cryptr.decrypt(result[0].password);
//        let registered_user = result[0].user_id;
  
//       if(registered_user == user_name &&  registered_password == pass_word){
        
       
//           // Issue token
//           const payload = { user_name };
//           const token = jwt.sign(payload, secret, {
//             expiresIn: '1h'
//           });
//           logger.fatal({"token":token,"Message":"Login Successful"})
//           console.log("token ==>",token);
          
//           res.cookie('token', token, { httpOnly: true })
//             .send({
//               Message:"Login Successful",
//               النتيجة: "تسجيل الدخول ناجح",
//               Token:token
            
//             });
        
  
        
     
        
//   }
  
//   else{
//     res.send({
//       result:"User Name or Password is Incorrect",
//       النتيجة: "اسم المستخدم أو كلمة المرور غير صحيح"
  
    
//   })
//   }
//       }
      
//     });
   
    
//   });
  
  // router.post('/logout',cors(),function(req,res) {
  //   var update = "UPDATE login_test1 SET login_time= '" + date.format(now, 'YYYY/MM/DD HH:mm:ss') +"' WHERE user_id='" + user_name + "'";
  //     con.query(update,function(err, result){
  //       if (err) throw err;
  //       console.log(result,"update")
  //     })
  
  //});
  router.post('/login',cors(),function(req,res) {

    var loginrequest = req.body;
    console.log("request",loginrequest)
    var user_name = req.body.username;
    
   var pass_word = req.body.password;

   console.log(user_name)
   console.log(pass_word,"pass_word")

    var sql = "SELECT  * FROM register_test1 where Email ='" + user_name + "'";
   
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result)
  let  registered_password = cryptr.decrypt(result[0].Password);
  console.log(registered_password,"db password")
  let registered_user = result[0].Email;
  console.log(registered_user,"user nameeeeeeeee")

    if(registered_user == user_name &&  registered_password == pass_word){
      
     
        // Issue token
        const payload = { user_name };
        const token = jwt.sign(payload, secret, {
          expiresIn: '1h'
        });
        console.log("token ==>",token);
        res.cookie('token', token, { httpOnly: true })
          .send({
            Message:"Login Successful",
            النتيجة: "تسجيل الدخول ناجح",
            Token:token
          
          });
    }
else{
  res.send({
    result:"User Name or Password is Incorrect",
    النتيجة: "اسم المستخدم أو كلمة المرور غير صحيح"

  
})
}
    
  });
 
  
});

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
var 	emailtosend = userResults.email;
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
		subject: 'Aman Service-OTP Confirmation',

		html: "Email confirmation from Aman services,<br> Your Otp is.<br> " + otp + "<br>" +
			"تأكيد بالبريد الإلكتروني من خدمات أمان ، <br> Your Otp is. <br>" + otp

	};
	transporter.sendMail(mailOptions, (error, info) => {
		console.log(info, "information")
		res.send({
			Message: "please check your email for otp",
			الرسالة: "الرجاء التحقق من بريدك الإلكتروني لـ otp"
		})
		if (error) {
			console.log("Mail send error: ", error);
		}
	});
});
router.post('/otp', (req, res) => {

    
  var phonetosend = req.body.phone;
  console.log(phonetosend)

  var otp = "";
  var possible = "0123456789";
 
  for (var i = 0; i<4; i++)
      otp += possible.charAt(Math.floor(Math.random() * possible.length));
  console.log("otp" + otp);
  //logger.fatal('OTP getting generate'+ '-->' +otp);
  sendOtp.send(phonetosend, "Readypolicy", otp, function (error, data, response) {
      console.log(data,"wow");
     // console.log("response",response)
      console.log(otp,"otp")
      var otptosend = 'your otp is ' + otp;
  console.log("your otp is",otp)
  sendOtp.setOtpExpiry('5');
 
   
    if(data.type == 'success') {
      console.log('OTP verified successfully');
   res.send(otptosend)}
  // if(data.type == 'error') {
  //     console.log('OTP verification failed')
  //     res.send("OTP verification failed")}
  
  

  
          

  

              
  
})
});
  router.post('/forgetpassword',(req,res) =>{
    
    let forgetpassword = req.body;
    let new_password = req.body.new_password;
    
    let confirm_password = req.body.confirm_password;
    let username = req.body.username;
            let sql = "SELECT  password,user_id FROM register_test1 where user_id ='" + username + "'";
          
            con.query(sql, function (err, result) {
              logger.fatal(result,"select")
              if (err) throw err;
              logger.fatal("Database Error while selecting from register table:",err)
              if(result.length == 0){
                res.send({Message:"Invalid User Name",
                الرسالة: "اسم المستخدم غير صالح"              })
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
              }
            // });
            else{
            console.log(new_password,"try")
            new_password = cryptr.encrypt(req.body.new_password);
           console.log(new_password);
            var sql ="UPDATE register_test1 SET password = '" + new_password + "' WHERE user_id = '" + username + "'";
            con.query(sql, function (err) {
              if (err) throw err;
              res.send({Message:"password is updated",
              رسالة:"تم تحديث كلمة المرور"});
            });
          }
        }
      }
          
    } );
});
  
}