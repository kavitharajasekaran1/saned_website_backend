const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
const login = require('./routes/login')
const forgetpassword = require('./routes/forgetpassword')
const otp = require('./routes/sendotp')
const register = require('./routes/register')

const log4js = require('log4js');
log4js.configure({
    appenders: { sharjah_project: { type: 'file', filename: 'sharjah_project.log' } },
    categories: { default: { appenders: ['sharjah_project'], level: 'error' } }
  });

const logger = log4js.getLogger('sharjah_project');


  





//app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/login', login);
app.use('/api/forgetpassword',forgetpassword)
app.use('/api/sendotp',otp)
app.use('/api/register',register)
app.use(express.json());
 function connect(){
   mysql.createConnection({
    host: "127.0.0.1",
    user: "Rapidqube",
    password: "Rpqb$2018"
  });

}

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "Rapidqube",
    password: "Rpqb$2018"
  });

  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  


const port = process.env.PORT || 8082;
app.listen(port);

console.log(`App of version v0.01 Runs on ${port}`);
