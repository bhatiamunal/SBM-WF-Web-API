var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

module.exports = {
    
    insertManyCollection : function(dbName,data,collectionName,_cb){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(dbName);
            //var myobj = [{ name: "Company Inc", address: "Highway 37" }];
            var myobj = data;
            dbo.collection(collectionName).insertMany(myobj, function(err, res) {
              if (err) throw err;
            //   console.log("1 document inserted");
              db.close();
              return _cb(" documents inserted")
            });
          });
    },
 
    fetchAll:function(myDb,queary,collectionName,excludes,mysorts,vrlimits,_cb){
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(myDb);
        //var query = { address: "Park Lane 38" };
        //  var query = { address: /^S/ };
        var query = queary;
        //let exclude = { _id: 0, name: 1, address: 1 }
        exclude={}
        excludes.forEach(element => {
          exclude[element] = 0
        });
        // var mysort = { name: 1 };
        //{ name: 1 } // ascending
        //{ name: -1 } // descending
       var mysort = mysorts;
      //  vrlimits=0
       var limits = vrlimits;
        dbo.collection(collectionName).find(query,{ projection: exclude } ).sort(mysort).limit(limits).toArray(function(err, result) {
          if (err) throw err;
        
          db.close();
          return _cb(result)
        });
      });
    },
    deleteAll:function(dbName,myquery,collectionName,_cb){
            
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        // var myquery = { address: /^O/ };
        dbo.collection(collectionName).deleteMany(myquery, function(err, obj) {
          if (err) throw err;
          //console.log(obj.result.n + " document(s) deleted" );
          db.close();
          return _cb(obj.result.n + " document(s) deleted");
        });
      });
    },
    dropCollection:function(dbName,collectionName,_cb){
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(collectionName).drop(function(err, delOK) {
          if (err) throw err;
          //if (delOK) console.log("Collection deleted");
          db.close();
          if (delOK) return _cb("Collection deleted")
        });
      });
    },
    updateAll:function(myDb,myquery,collectionName,newvalue,_cb){
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(myDb) ;
        //var myquery = { address: /^S/ };
        //var newvalues = {$set: {name: "Minnie"} };
        var newvalues = {$set: newvalue };
        dbo.collection(collectionName).updateMany(myquery, newvalues, function(err, res) {
          if (err) throw err;
          //console.log(res.result.nModified + " document(s) updated");
          db.close();
          return _cb(res.result.nModified + " document(s) updated")
        });
      });
    }


    
}
