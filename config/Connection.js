const db = require('./DBConfig.js');

//console.log("db",db);

function connectionCheck() {
<<<<<<< HEAD
   return new Promise((resolve,reject) => {
     db.getConnection(function(err, connection) {
              if(err) {
                  if(connection) connection.release();
                reject(err)
             } else  {
                 console.log("connected");
               resolve('success')
             }
         })
     })
 }

function connectionRelease() {
   db.on('release', function (connection) {
       console.log('Connection %d released', connection.threadId);
   });
}

module.exports = {
   connectionCheck:connectionCheck(),
   connectionRelease:connectionRelease()
}
=======
    return new Promise((resolve,reject) => {
      db.getConnection(function(err, connection) {
               if(err) {
                   if(connection) connection.release();
                 reject(err)
              } else  {
                resolve('success')
              }
          })
      })
  }

function connectionRelease() {
    db.on('release', function (connection) {
        console.log('Connection %d released', connection.threadId);
    });
}

module.exports = {
    connectionCheck:connectionCheck(),
    connectionRelease:connectionRelease()   
}
>>>>>>> bcf5512e4cbf814c2888a1a0bcf2cfe04aff8dd1
