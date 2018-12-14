const express = require('express');
const app = express();
var path = require('path');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const login = require('./routes/login')
const forgetpassword = require('./routes/forgetpassword')
const otp = require('./routes/sendotp')
const register = require('./routes/register')
const emailotp = require('./routes/emailotp')
var swaggerJSDoc = require('swagger-jsdoc');
var routes = require('./routes/index');

//app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api/login', login);
app.use('/api/forgetpassword',forgetpassword)
app.use('/api/sendotp',otp)
app.use('/api/register',register)
app.use('/api/sendemail',emailotp)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
 
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:8082',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/swagger-docs.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

const port = process.env.PORT || 8082;
app.listen(port);

console.log(`App of version v0.01 Runs on ${port}`);