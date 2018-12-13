//CREATE TABLE userlogin (ID INT PRIMARY KEY AUTO_INCREMENT,username VARCHAR(50) NOT NULL, password VARCHAR(50) NOT NULL);
const express = require('express');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const cors = require('cors')
const router = express.Router();
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhh';
const log4js = require('log4js');
log4js.configure({
    appenders: { sharjah_project: { type: 'file', filename: 'sharjah_project.log' } },
    categories: { default: { appenders: ['sharjah_project'], level: 'error' } }
  });

const logger = log4js.getLogger('sharjah_project');

const app = express();
app.use(express.json());
var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "Rapidqube",
    password: "Rpqb$2018",
    database:"SHARJAH"
  });



router.post('/login',cors(),function(req,res) {
  logger.fatal("Entering into login services")

    var loginrequest = req.body;
    console.log("request",loginrequest)
    var user_name = req.body.username;
    
   var pass_word = req.body.password;

   console.log(user_name)
   console.log(pass_word,"pass_word")

    var sql = "SELECT  * FROM register_test where Email ='" + user_name + "'";
   
  con.query(sql, function (err, result) {
    if (err) throw err;
    logger.fatal(err,"databaseError")
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
        logger.fatal({"token":token,"Message":"Login Successful"})
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
module.exports = router;