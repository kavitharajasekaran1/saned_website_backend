const mysql = require('mysql');

module.exports = mysql.createPool({
   connectionLimit : 100,
   host : '127.0.0.1',
   user :  'root',
   password: 'Rpqb$2018',
   database: 'SHARJAH'
})

