var path = require('path');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var crypto = require('crypto');

mongoose.connect('mongodb://localhost/shortly');

var db = mongoose.connection;
//var db = mongoose.createConnection('localhost', 'test');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
});



// var urlSchema = new mongoose.Schema({
//   url: String,
//   baseUrl: String,
//   code: {type: String, default: function() {
//     var shasum = crypto.createHash('sha1');
//     shasum.update(this.get('url'));
//     return shasum.digest('hex').slice(0, 5);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   },
//   title: String,
//   visits: 0
// },
//   {
//     timestamps: true
//   }
// );

// var userSchema = new mongoose.Schema({
//   username: String,
//   password: {type: String, default: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }


//   }
// },
//   {
//     timestamps: true
//   }
// );


// module.exports.urlSchema = urlSchema;

// module.exports.userSchema = userSchema;

module.exports = db;

// var Link = db.model('Link', urlSchema);

// var User = db.model('User', userSchema);



// module.exports.Link = Link;
// module.exports.User = User;











// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

