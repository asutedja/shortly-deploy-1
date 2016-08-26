//var app = require('./server-config.js');
var express = require('express');
var app = express();

var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost');

var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!

  var urlSchema = new mongoose.Schema({
    url: String,
    baseUrl: String,
    code: String,
    title: String,
    visits: Number
  },
    {
      timestamps: true
    }
  );

  var userSchema = new mongoose.Schema({
    username: String,
    password: String
  },
    {
      timestamps: true
    }
  );



  var Link = mongoose.model('Link', urlSchema);

  var User = mongoose.model('User', userSchema);

  var google = new Link({url: 'http://www.asdasdgoogle.com',
    baseUrl: 'http://www.goasdlasjdogle.com',
    code: '123asdasd45',
    title: 'BROBRRLELJSLKFHSLKFJ444444444444444444444',
    visits: 0
  });







  google.save().then(function () {
    Link.find(function(err, kittens) {
      console.log(kittens);
    });
  })
  .then(function(err, data) {
    google.save();
    })
  .then(function() {
    Link.find(function() {
      console.log('my life is a promise');
    });
  });




  // google.save(function(err, google) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   Link.find(function(err, kittens) {
  //     console.log(kittens);
  //   });
  // });

});



var port = 4568;

app.listen(port);

console.log('Server now listening on port ' + port);
