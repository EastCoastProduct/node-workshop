'use strict';
var pasSa = '$2a$11$DJieyPWkPCid6YgR4LLrI.BPik0b9a67qJBhz0pXW5U61WGItrtqS';
var id = require('pow-mongodb-fixtures').createObjectId;

var userIds = [
  id('4ed2b809d7446b9a0e000000')
];

exports.users = [
  {
    _id: userIds[0],
    email: 'test@test.com',
    password: pasSa,
    confirmed: true
  }
];
