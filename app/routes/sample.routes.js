
module.exports = (app) => {
    function verf(req,res,next){
        if(req.query.userId && req.query.sessionId){
            next();
        }
        else if(req.body.userId && req.body.sessionId){
            next();
        }
        else 
        {
            res.json("Please Validate Yourself.");
        }
    }
  
    const sample = require('../controllers/sample.controllers.js');
    // define a simple route
    // app.get('/', (req, res) => {
    //     res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
    // });
    // Create a new Note
    app.post('/notes',verf, sample.create);

    // Retrieve all Notes
    app.get('/notes',verf, sample.findAllRecords);

    // Retrieve a single Note with noteId
    app.get('/notesOne',verf, sample.findOne);

    // Update a Note with noteId
    app.put('/notes',verf, sample.update);

    // Delete a Note with noteId
    app.delete('/notes',verf, sample.delete);
}