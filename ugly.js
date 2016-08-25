var app=require("./server-config.js"),port=4568;app.listen(port),console.log("Server now listening on port "+port);var db=require("../config"),Link=require("../models/link"),Links=new db.Collection;Links.model=Link,module.exports=Links;var db=require("../config"),User=require("../models/user"),Users=new db.Collection;Users.model=User,module.exports=Users;var db=require("../config"),crypto=require("crypto"),Link=db.Model.extend({tableName:"urls",hasTimestamps:!0,defaults:{visits:0},initialize:function(){this.on("creating",function(a,b,c){var d=crypto.createHash("sha1");d.update(a.get("url")),a.set("code",d.digest("hex").slice(0,5))})}});module.exports=Link;var db=require("../config"),bcrypt=require("bcrypt-nodejs"),Promise=require("bluebird"),User=db.Model.extend({tableName:"users",hasTimestamps:!0,initialize:function(){this.on("creating",this.hashPassword)},comparePassword:function(a,b){bcrypt.compare(a,this.get("password"),function(a,c){b(c)})},hashPassword:function(){var a=Promise.promisify(bcrypt.hash);return a(this.get("password"),null,null).bind(this).then(function(a){this.set("password",a)})}});module.exports=User;var path=require("path"),knex=require("knex")({client:"sqlite3",connection:{filename:path.join(__dirname,"../db/shortly.sqlite")},useNullAsDefault:!0}),db=require("bookshelf")(knex);db.knex.schema.hasTable("urls").then(function(a){a||db.knex.schema.createTable("urls",function(a){a.increments("id").primary(),a.string("url",255),a.string("baseUrl",255),a.string("code",100),a.string("title",255),a.integer("visits"),a.timestamps()}).then(function(a){console.log("Created Table",a)})}),db.knex.schema.hasTable("users").then(function(a){a||db.knex.schema.createTable("users",function(a){a.increments("id").primary(),a.string("username",100).unique(),a.string("password",100),a.timestamps()}).then(function(a){console.log("Created Table",a)})}),module.exports=db;var request=require("request"),crypto=require("crypto"),bcrypt=require("bcrypt-nodejs"),util=require("../lib/utility"),db=require("../app/config"),User=require("../app/models/user"),Link=require("../app/models/link"),Users=require("../app/collections/users"),Links=require("../app/collections/links");exports.renderIndex=function(a,b){b.render("index")},exports.signupUserForm=function(a,b){b.render("signup")},exports.loginUserForm=function(a,b){b.render("login")},exports.logoutUser=function(a,b){a.session.destroy(function(){b.redirect("/login")})},exports.fetchLinks=function(a,b){Links.reset().fetch().then(function(a){b.status(200).send(a.models)})},exports.saveLink=function(a,b){var c=a.body.url;return util.isValidUrl(c)?void new Link({url:c}).fetch().then(function(d){d?b.status(200).send(d.attributes):util.getUrlTitle(c,function(d,e){if(d)return console.log("Error reading URL heading: ",d),b.sendStatus(404);var f=new Link({url:c,title:e,baseUrl:a.headers.origin});f.save().then(function(a){Links.add(a),b.status(200).send(a)})})}):(console.log("Not a valid url: ",c),b.sendStatus(404))},exports.loginUser=function(a,b){var c=a.body.username,d=a.body.password;new User({username:c}).fetch().then(function(c){c?c.comparePassword(d,function(d){d?util.createSession(a,b,c):b.redirect("/login")}):b.redirect("/login")})},exports.signupUser=function(a,b){var c=a.body.username,d=a.body.password;new User({username:c}).fetch().then(function(e){if(e)console.log("Account already exists"),b.redirect("/signup");else{var f=new User({username:c,password:d});f.save().then(function(c){Users.add(c),util.createSession(a,b,c)})}})},exports.navToLink=function(a,b){new Link({code:a.params[0]}).fetch().then(function(a){a?a.set({visits:a.get("visits")+1}).save().then(function(){return b.redirect(a.get("url"))}):b.redirect("/")})};var request=require("request");exports.getUrlTitle=function(a,b){request(a,function(c,d,e){if(c)return console.log("Error reading url heading: ",c),b(c);var f=/<title>(.*)<\/title>/,g=e.match(f),h=g?g[1]:a;return b(c,h)})};var rValidUrl=/^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;exports.isValidUrl=function(a){return a.match(rValidUrl)},exports.isLoggedIn=function(a,b){return!!a.session&&!!a.session.user},exports.checkUser=function(a,b,c){exports.isLoggedIn(a)?c():b.redirect("/login")},exports.createSession=function(a,b,c){return a.session.regenerate(function(){a.session.user=c,b.redirect("/")})};