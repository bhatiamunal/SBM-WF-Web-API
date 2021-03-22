
const {updateAll,dropCollection,deleteAll,fetchAll,insertManyCollection} = require('./../../lib');
// Create and Save a new Note
exports.create = (req, res) => {
    let dbName ="mydb",
    data=req.body.data,
    collectionName="sample"
    insertManyCollection(dbName,data,collectionName,function(result ){
        res.json({"errorCode" :0,"data":result});
    })
};

// Retrieve and return all notes from the database.
exports.findAllRecords = (req, res) => {
    let dbName ="mydb",
    data={},
    collectionName="sample",
    exclude = ["name"],
    mysort = { name: -1 }
    vrlimits = 0
    fetchAll(dbName,data,collectionName,exclude,mysort,vrlimits  ,function(result ){
        res.json({"errorCode" :0,"data":result});
    })

};


// Find a single note with a noteId
exports.findOne = (req, res) => {
    
    let dbName ="mydb",
    data={name:req.query.name},
   
    collectionName="sample",
    exclude = ["name"],
    mysort = { name: -1 }
    vrlimits = 0
    console.log(data)
    fetchAll(dbName,data,collectionName,exclude,mysort,vrlimits  ,function(result ){
        
        res.json({"errorCode" :0,"data":result});
    })
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    let dbName ="mydb",
    data={name:req.query.name},
    collectionName="sample",
    newvalue = {name:req.query.newName}
   
    updateAll(dbName,data,collectionName,newvalue,function(result ){
        res.json({"errorCode" :0,"data":result});
    })
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    let dbName ="mydb",
    data={name:req.query.name},
    collectionName="sample"
   
   
    deleteAll(dbName,data,collectionName,function(result ){
        res.json({"errorCode" :0,"data":result});
    })
};