


// const sendOtp = require('sendotp');
// const mysql = require('mysql')
// const express = require('express');
// // const cors = require('cors')
// const router = express.Router();
// const app = express();
// app.use(express.json());
// var con = mysql.createConnection({
//     host: "127.0.0.1",
//     user: "Rapidqube",
//     password: "Rpqb$2018",
//     database:"SHARJAH"
//   });

//   router.post('/register', (req, res) => {

//   var phonetosend = req.body.phone;
//   console.log(phonetosend)

//   var otp = "";
//   var possible = "0123456789";
 
//   for (var i = 0; i<4; i++)
//       otp += possible.charAt(Math.floor(Math.random() * possible.length));
//   console.log("otp" + otp);
//   //logger.fatal('OTP getting generate'+ '-->' +otp);
//   sendOtp.send(phonetosend, "Readypolicy", otp, function (error, data, response) {
//       console.log(data,"wow");
//      // console.log("response",response)
//       console.log(otp,"otp")
//       var otptosend = 'your otp is ' + otp;
//   console.log("your otp is",otp)
//   sendOtp.setOtpExpiry('5');
 
   
//     if(data.type == 'success') {
//       console.log('OTP verified successfully');
//    res.send(otptosend)}
//   if(data.type == 'error') {
//       console.log('OTP verification failed')
//       }
//     })
//     return otp;
// });
// var otp=module.exports={otp};
// module.exports = router;


const express = require('express');
const router = express.Router();
const SendOtp = require('sendotp');
const sendOtp = new SendOtp('244272APSziUwF95bd0480c');
var otp =80;
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
    //==============================================otp resssend===============================//
   
    
    

    module.exports=router;
    

