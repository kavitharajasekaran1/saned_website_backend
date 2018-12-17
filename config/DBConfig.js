const mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit : 100,
    host : 'localhost',
    user :  'root',
    password: 'Rpqb$2018',
    database: 'SHARJAH'
})
