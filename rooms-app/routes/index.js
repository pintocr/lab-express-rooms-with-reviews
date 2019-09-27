const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  let hidden = {show: false, user: ""};
  if(req.session.currentUser !== undefined){
    hidden.show = true;
    console.log("Wer bist du? " + Object.getOwnPropertyNames(req.session.currentUser));
    console.log("was? " + req.session.currentUser.fullName);
    hidden.user = req.session.currentUser.fullName
  } else {
    hidden.show = false;
  }
  res.render('index', {hidden});
});

module.exports = router;
