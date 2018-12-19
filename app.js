
/**
@author: kavitha And Manoj
@version: 1.0
@date: 09/12/2018
@Description: sanad project
**/
//this is the start of the application 
'use strict';

const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
var log4js = require('log4js');
var con = require('./config/Connection.js');
var path = require('path');
log4js.configure({
  appenders: {
    Aman_project: { type: 'dateFile', filename: './log/Aman_Project_'+ new Date().getFullYear() + "-"+ (new Date().getMonth()+ 1) + "-"+ new Date().getDate()+'.log'}
  },
  categories: {
    default: { appenders: [ 'Aman_project' ], level: 'debug' }
  }
});

const logger = log4js.getLogger('Aman_project');


con.connectionCheck;




app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

require('./routes')(router);
app.use('/', router);
var swaggerJSDoc = require('swagger-jsdoc');





app.use(express.static(path.join(__dirname, 'public')));


 
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'SENAD API',
    version: '1.0.0',
    description: 'Demonstrating RESTful API OF SANED',
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
console.log(`App Runs on ${port}`);
logger.fatal(`Server has started App is Running on Port ${port}`);











