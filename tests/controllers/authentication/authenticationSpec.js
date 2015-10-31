'use strict';

var mongoose = require('mongoose')
  , should = require('should')
  , request = require('supertest')
  , app = require('../../../app');

var jwt = require('jsonwebtoken');

var fixture = require('../../fixtures');

var User = mongoose.model('User');

describe('Authentication', function() {
  describe('POST /authentication', function() {

    before(fixture.clear);
    before(fixture.oneUser);

    describe('Invalid parameters', function() {

      it('invalid password - should respond with errors', function(done) {
        request(app)
        .post('/authentication')
        .send({
          email: 'test@test.com',
          password: 'password'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          should.not.exist(err);
          should(res.body.message).equal('Wrong password.');
          done();
        });
      });

      it('email and password required', function(done) {
        request(app)
        .post('/authentication')
        .send({
          password: 'password'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          should.not.exist(err);
          should(res.body.message).equal('Email and password required.');
          done();
        });
      });

      it('invalid email - should respond with errors', function(done) {
        request(app)
        .post('/authentication')
        .send({
          email: 'test1@com.com',
          password: 'asdfasd'
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          should.not.exist(err);
          should(res.body.message).equal('User does not exist.');
          done();
        });
      });
    });

    describe('Valid parameters', function() {
      it('should authenticate', function(done) {
        request(app)
        .post('/authentication')
        .send({
          email: 'test@test.com',
          password: 'a'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          should(res.body.token).exist;
          var decoded = jwt.decode(res.body.token, { complete: true });
          decoded.payload.confirmed.should.eql(true);
          should.exist(decoded.payload.userId);
          done();
        });
      });
    });
  });

});
