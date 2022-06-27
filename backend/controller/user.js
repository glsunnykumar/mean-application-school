const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

exports.userLogin = (req, res, next) => {
  let findUser ;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'auth failed'
        });
      }
      findUser= user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'auth failed'
        });
      }

      const token = jwt.sign({ email: findUser.email, userid: findUser._id },
         process.env.JWT_KEY, { expiresIn: "1h" });
      res.status(200).json({
        token: token,
        expireIn :3600,
        userId :findUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'auth failed'
      });
    });
}

exports.createUser =(req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Saved',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
          message :"Invalid authentication credentials"
          });
        })

    });

}
