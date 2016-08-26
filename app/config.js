var path = require('path');
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test');

var db = mongoose.createConnection('localhost', 'test');

db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function() {
//   // we're connected!
// });



var urlSchema = new mongoose.Schema({
  url: String,
  baseUrl: String,
  code: {type: String, default: function() {
    var shasum = crypto.createHash('sha1');
    shasum.update(this.url);
    return shasum.digest('hex').slice(0, 5);
  }
  },
  title: String,
  visits: 0
},
  {
    timestamps: true
  }
);

var userSchema = new mongoose.Schema({
  username: String,
  password: {type: String, default: 


  }
},
  {
    timestamps: true
  }
);

module.exports.urlSchema = urlSchema;

module.exports.userSchema = userSchema;

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

