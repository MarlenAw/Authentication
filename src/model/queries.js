const connect = require('../../database/db_connection');


const addUser = (username, email, password, cb) => {
  connect.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
  [username, email, password],
  (err, results) => {
    if(err){
      cb(err);
    }else {
        cb(null, results);
      }
  });
}

module.exports = {addUser}
