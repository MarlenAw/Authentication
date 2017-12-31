const connect = require('../../database/db_connection');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const addUser = (username, email, password, cb) => {
  bcrypt.hash(password, saltRounds, (err, hash) => {
    connect.query(`INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
    [username, email, hash],
    (err, results) => {
      if(err){
        cb(err);
      }else {
          cb(null, results);
        }
    });
  })
}

module.exports = {addUser}
