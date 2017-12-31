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

const checkUserIfLoggedIn = (cb) => {
  connect.query(`SELECT MAX(ID) AS user_id FROM users`, (err, results) => {
    if(err){
      console.log("Something went wrong with checkUserIfLoggedIn query");
    }else{
      cb(null, results);
    }
  })
}

module.exports = {addUser, checkUserIfLoggedIn}
