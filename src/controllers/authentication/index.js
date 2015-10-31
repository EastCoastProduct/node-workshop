'use strict';

var async = require('async');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var config = require('../../../config');
var errors = require('../../utils/errors');

var User = require('../../models/user');

var Error400 = errors.Error400;

function authenticate(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return next(Error400('Email and password required.'));
  }

  function getUser(callback) {
    User.findOne({email: req.body.email}).exec(callback);
  }

  function checkPassword(callback, results) {
    if (results.getUser === null) {
      return callback(Error400('User does not exist.'));
    }

    var sentPassword = req.body.password;
    var userPassword = results.getUser.password.trim();

    bcrypt.compare(sentPassword, userPassword, callback);
  }

  async.auto({
    getUser: getUser,
    checkPassword: ['getUser', checkPassword]
  }, function(err, results) {
    if (err) return next(err);

    if (!results.checkPassword) {
      return next(Error400('Wrong password.'));
    }

    var user = results.getUser;

    var token = jwt.sign(
      {
        userId: user.id,
        confirmed: user.confirmed
      },
      config.jwtKey,
      {expiresInMinutes: config.tokenExpiration}
    );
    res.status(200).json({token: token});
  });
}

module.exports = authenticate;
