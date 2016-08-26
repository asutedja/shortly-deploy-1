var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
 
// Connection URL 
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  db.close();
});

var insertDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('documents');
  // Insert some documents 
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection");
    callback(result);
  });
};

var updateDocument = function(db, callback) {
  var collection = db.collection('documents');

  collection.updateMany({a:{ $gte: 2}}, {$set: {a: 4, c: 3}}, function (err, results) {
    results = results.toString();
    console.log('inside update document', results);
    callback(results);

  });
};

var deleteDocument = function (db, callback) {
  var collection = db.collection('documents');
  console.log('in delete');
  collection.deleteOne({}, function (err, result) {
    console.log('in delete',result);
    //callback(result);
    collection.find({}).toArray(function(err,docs) {
      console.log('all the docs');
      console.dir(docs);

    });
  });
};





MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  updateDocument(db, function(results) {
    console.log('outside update document', results);

    deleteDocument(db, function(result) {
      console.log('inside delete', result);
      db.close();
    });
    
  });
  // insertDocuments(db, function() {
  //   db.close();
  // });
});
