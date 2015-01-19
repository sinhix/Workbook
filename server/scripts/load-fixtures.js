require('../bootstrap');

var winston = require('winston');
var config  = require('config');

var User = require('../models/user');

var mongoose = require('mongoose');

// Load fixtures
var fixtures = require('node-mongoose-fixtures');

// Faker to generate fake data
var faker = require('faker');
faker.locale = "fr";

// Create fake users
var users = [];
for (var i = 1; i <= 10; i++ ) {
    users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: 'consultant'+i+'@gjail.com',
        password: 'consultant',
        status: 'consultant',
        validated: 1,
        admin: false,
        addressMission: faker.address.streetAddress(),
        technologiesOfPredilection: 'PHP',
        language: 'fr'
    });
}

var logSaveError = function(title, err){
  winston.error(title);
  winston.error(err.message);
  if (err.errors) {
    Object.keys(err.errors).forEach(function(errorKey){
      winston.error(errorKey + ': ' + err.errors[errorKey].message);
    });
  }
  winston.error('Please be sure you have set all required properties');

  process.exit(1);
};

// Create dataset immediately
fixtures({
    User: users
}, function(err, data) {
    if (err) return logSaveError('Signup failed', err);

    winston.info(data.length +' users saved');
    process.exit(1);
});