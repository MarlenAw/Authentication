const express = require('express');
const router = express.Router();
const expressValidator = require('express-validator');
const {addUser} = require('../model/queries');

// GET home page
router.get('/', (req, res, next) => {
  res.render('home', {title: 'Let me in!'});
});

router.get('/registration', (req, res, next) => {
  res.render('register', {title: 'Create an Account'});
});

router.post('/register', (req, res, next) => {
    //using req.body because we included bodyParser in app.js otherwise we wont be able to use req.body and it'll throw an error
    //that says username is not defined.
    req.checkBody('username', 'Username can not be empty.').notEmpty(); //Express-Validator adds a function calls checkBody
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 30);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(5, 100);
    // req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
    // Additional validation to ensure username is alphanumeric with underscores and dashes
    req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

    const errors = req.validationErrors();

    if(errors){
      console.log(`errors: ${JSON.stringify(errors)}`);
      res.render('register', {title: 'Registration Error', errors: errors});
    }

    const {username, email, password} = req.body;

    addUser(username, email, password, (err, results) => {
      if (err) {
        console.log("User couldn't be added", err);
      }else{
        console.log("User has been successfully added!");
        res.render('home', {title: "Login To Your Account"})
      }
    });
});



module.exports = router;
