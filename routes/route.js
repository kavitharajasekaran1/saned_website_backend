// //CREATE TABLE userlogin (username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL);
// const express = require('express');
// const Cryptr = require('cryptr');
// const cryptr = new Cryptr('myTotalySecretKey');
// const cors = require('cors')
// const router = express.Router();
// const mysql = require('mysql');
// const jwt = require('jsonwebtoken');

// const secret = 'mysecretsshhh';

// const app = express();
// app.use(express.json());
// var con = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     password: "Rpqb$2018",
//     database:"SHARJAH"
//   });



// router.post('/login',cors(),function(req,res) {

//     var loginrequest = req.body;
//     console.log("request",loginrequest)
//     var user_name = req.body.username;
    
//    var pass_word = req.body.password;

//    console.log(user_name)
//    console.log(pass_word,"pass_word")

//     var sql = "SELECT  * FROM register_test1 where Email ='" + user_name + "'";
   
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result)
//   let  registered_password = cryptr.decrypt(result[0].Password);
//   console.log(registered_password,"db password")
//   let registered_user = result[0].Email;
//   console.log(registered_user,"user nameeeeeeeee")

//     if(registered_user == user_name &&  registered_password == pass_word){
      
     
//         // Issue token
//         const payload = { user_name };
//         const token = jwt.sign(payload, secret, {
//           expiresIn: '1h'
//         });
//         console.log("token ==>",token);
//         res.cookie('token', token, { httpOnly: true })
//           .send({
//             Message:"Login Successful",
//             النتيجة: "تسجيل الدخول ناجح",
//             Token:token
          
//           });
//     }
// else{
//   res.send({
//     result:"User Name or Password is Incorrect",
//     النتيجة: "اسم المستخدم أو كلمة المرور غير صحيح"

  
// })
// }
    
//   });
 
  
// });
// router.post('/register', (req, res) => {
   


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
    
    
//  console.log(mobile,"mobile");
//  var sql = "SELECT  * FROM register_test1 where Email ='" + email + "'";
// con.query(sql, function (err, result) {
// console.log("result",result);
// console.log(result.length != 0);
// if (err) throw err;
// if(result.length != 0){
//  res.send({Message:"User Already Registered",
//            الرسالة: "مستخدم مسجل بالفعل"
// })
// }



//    else{    
//      var sql = "INSERT INTO register_test1 (Title, Name,Company,Nationality,PhoneNumber,Address,PO_BOX,Mobile,Email,Password) VALUES ('" + title + "','" + name + "','" + company + "','" + nationality + "','" +phonenumber + "','" + address + "','" + pobox + "','" + mobile + "','" + email + "','" + password + "')";
//     con.query(sql, function (err, result) {
//   if (err) throw err;
//   res.send({
//      result:"You are successfully registered",
//      النتيجة: "أنت مسجل بنجاح"
//  })
// });
// }


// });


// });
