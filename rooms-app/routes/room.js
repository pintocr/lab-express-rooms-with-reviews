const express = require('express');
const router = express.Router();


const Room = require('../models/room');

//SIGN-UP
router.get('/rooms', (req, res, next) => {
    Room.find() .then(allTheRoomsFromDB => {
        // console.log('Retrieved books from DB:', allTheBooksFromDB);
        res.render('rooms', { rooms: allTheRoomsFromDB });
      })
      .catch(error => {
        console.log(error);
      })
  });

  router.get('/createRoom', (req, res, next) => {
    res.render('createRoom');
  });


  router.post("/createRoom", (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const ownID = req.session.currentUser._id;
  
    if (name === "" || description === "" || imageUrl === "") {
      res.render("createRoom", {
        errorMessage: "All fields need to be fill out"
      });
      return;
    }
        Room.create({
            name,
            description,
            imageUrl, 
            owner : ownID
        })
          .then(() => {
            res.redirect("/");
          })
          .catch(error => {
            console.log(error);
          })
      .catch(error => {
        next(error);
      })
  });

module.exports = router;