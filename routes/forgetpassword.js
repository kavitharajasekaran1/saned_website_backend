const mysql = require('mysql')
const express = require('express');
// const cors = require('cors')
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const router = express.Router();
const app = express();
app.use(express.json());
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "Rapidqube",
    password: "Rpqb$2018",
    database:"SHARJAH"
  });
  // var new_password ="0";
  // var confirm_password ="0";
  // var  username ="0";

  router.post('/forgetpassword',(req,res) =>{
    var username = req.body.username;
            var sql = "SELECT  * FROM register_test where Name ='" + username + "'";
            con.query(sql, function (err, result) {
              if (err) throw err;
            
     var forgetpassword = req.body;
    var new_password = req.body.new_password;
    
    var confirm_password = req.body.confirm_password;
      if(new_password !=confirm_password){
      res.send({Message:"password doesn't match",
      الرسالة: "كلمة المرور غير متطابقة"})
      }
      else{
        
      
    
      //else{
       
        
             
              console.log(result[0])
               if(cryptr.decrypt(result[0].Password) == new_password ){

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
            var sql ="UPDATE register_test SET Password = '" + new_password + "' WHERE Name = '" + username + "'";
            con.query(sql, function (err) {
              if (err) throw err;
              res.send({Message:"password is updated",
              رسالة:"تم تحديث كلمة المرور"});
            });
          }
        }
          
    } );
});
  module.exports = router;