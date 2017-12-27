const express = require('express');
const router = express.Router();
const {addUser} = require('../model/queries');

// GET home page
router.get('/', (req, res, next) => {
  res.render('home', {title: 'Login'});
});

router.get('/registration', (req, res, next) => {
  res.render('register', {title: 'Create an Account'});
});

router.post('/register', (req, res, next) => {
    //using req.body because we included bodyParser in app.js otherwise we wont be able to use req.body and it'll throw an error
    //that says username is not defined.
    const {username, email, password} = req.body;

    addUser(username, email, password, (err, results) => {
      if (err) {
        console.log("User couldn't be added", err);
      }else{
        res.redirect("/");
      }
    });
});



module.exports = router;
