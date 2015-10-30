'use strict';

// var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
// var config = require('../../config');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  firstname: {
    type: String,
    trim: true,
    required: true
  },
  lastname: {
    type: String,
    trim: true,
    required: true
  },
  confirmed: {
    type: Boolean,
    default: false
  }
});

// uncomment when implemented
// UserSchema.virtual('name.full').get(function() {
//   return this.firstname + ' ' + this.lastname;
// });

// UserSchema.pre('save', function(next) {
//   var user = this;
//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(config.genSaltRounds, function(err, salt) {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, function(error, hashed) {
//       if (error) return next(error);

//       user.password = hashed;
//       next();
//     });
//   });
// });

module.exports = mongoose.model('User', UserSchema);
