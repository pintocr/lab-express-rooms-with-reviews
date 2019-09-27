const express = require('express');
const router = express.Router();

const User = require('../models/user');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


//SIGN-UP
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const slackID = req.body.slackID;
  const googleID = req.body.googleID;

  if (username === "" || password === "") {
    res.render("signUp", {
      errorMessage: "Indicate a username and a password to sign up"
    });
    return;
  }
  User.findOne({ "username": username })
    .then(user => {
      if (user !== null) {
        res.render("signUp", {
          errorMessage: "The username "+username+" already exists!"
        });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      User.create({
        email: email,
        password: hashPass,
       fullName:  username,
        slackID: slackID,
       googleID:  googleID
      })
        .then(() => {
          res.redirect("/");
        })
        .catch(error => {
          console.log(error);
        })
    })
    .catch(error => {
      next(error);
    })
});

//LOGIN

router.get('/login', (req, res, next) => {
  res.render('login');
});


router.post("/login", (req, res, next) => {
  const theUsername = req.body.username;
  const thePassword = req.body.password;
  console.log("hi ich bin der: ", theUsername);

  if (theUsername == "" || thePassword == "") {
    console.log("Ich war hier ###################");
    res.render("login", {
      errorMessage: "Please enter both, username and password to log-In."
    });
    return;
  }

  User.findOne({ "fullName": theUsername })
  .then(user => {
      if (!user) {
        res.render("login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
          req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("login", {
          errorMessage: "Incorrect password"
        });
      }
  })
  .catch(error => {
    next(error);
  })
});

//LOGOUT
router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    res.redirect("/");
  });
});

module.exports = router;