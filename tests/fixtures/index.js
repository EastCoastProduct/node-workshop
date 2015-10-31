'use strict';

var fixtures = require('pow-mongodb-fixtures').connect('test');

function clear(done) {
  fixtures.clear(done);
}

function oneUser(done) {
  fixtures.load('users/one_user.js', done);
}

module.exports = {
  clear: clear,
  oneUser: oneUser
};
